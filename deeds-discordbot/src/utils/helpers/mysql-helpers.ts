import { GuildMember, User } from 'discord.js';
import { getAvatar } from './helpers';
import { IDeed, IDeedProgress, IMySQLSearchParams, IUser } from 'src/types';
import mysql, { ResultSetHeader } from 'mysql2/promise';
import 'dotenv/config';

const dbInfo = {
    host: 'localhost',
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
};

export const pool = mysql.createPool(dbInfo);


export const getMySQLDeedProgress = async (userId: number | string, deedId: number | string) => {
    const [rawDeedProgress] = await pool.execute(`
        SELECT * FROM deedsdb.users_progressions
        WHERE (deedId = ${deedId} AND userId = ${userId});
    `);
    const DeedProgress = rawDeedProgress as IDeedProgress[];
    if(!DeedProgress || DeedProgress.length < 1)
        return;
    return DeedProgress[0];
};
export const getMySQLDeeds = async (deedId?: number | string) => {
    const [rawDeedsList] = await pool.execute(`
        SELECT * FROM deedsdb.deeds
        ${
            deedId && `Where id = ${deedId}`
        };
    `);
    const deedsList = rawDeedsList as IDeed[];
    if(!deedsList || deedsList.length < 1)
        return;
    return deedsList;
};
export const getMySQLUsers = async (params?: IMySQLSearchParams) => {
    const searchParams = params ?
    (
        params.discordId ?
        `WHERE discordId = ${params.discordId}` :
        `WHERE id = ${params.userId}`
    ) : undefined;

    const [rawSelectedUsers] = await pool.execute(`
        SELECT * FROM deedsdb.users
            ${searchParams ? searchParams : ''}
        ;
    `);
    return rawSelectedUsers as IUser[];
};

export const createMySQLDeed = async (name: string, goal: number) => {
    const [rawNewDeed] = await pool.execute(`
        Insert into deedsdb.deeds (deedName, goal)
        Values ('${name}', ${goal});
    `);
    return rawNewDeed as ResultSetHeader;
};
export const createMySQLDeedsUser = async (member: GuildMember) => {
    const avatar = getAvatar(member.user);
    const insertedUser = (await pool.execute(`
        Insert into deedsdb.users (discordId, username, avatar) Values
        ('${member.id}', '${member.displayName}', '${avatar}');
    `))[0];
    if(!insertedUser) 
        return;
    const deedsList = await getMySQLDeeds();
    if(!deedsList)
        return;

    const deedsValues = getNewDeedsInsertValues(deedsList, (insertedUser as ResultSetHeader).insertId);
    if(!deedsValues) 
        return;
    await pool.execute(`
        Insert into deedsdb.users_progressions (deedId, userId, progress)
            Values ${deedsValues};
    `);

    return insertedUser as ResultSetHeader;
};


export const updateMySQLUserAvatar = async (user: User) => {
    await pool.execute(`
        UPDATE deedsdb.users
        SET avatar = "${getAvatar(user)}"
        WHERE discordId = ${user.id};
    `);
};
export const updateMySQLUserProgress = async(
    userId: number | string,
    deedId: number | string,
    count: number,
    increment?: boolean
) => {
    await pool.execute(`
        UPDATE deedsdb.users_progressions
        SET
        ${
            increment ?
            `progress = progress + ${count}` :
            `progress = ${count}`
        }
        WHERE (
            userId = ${userId} AND
            deedId = ${deedId}
        );
    `);
};

export const deleteMySQLUsers = async (discordId?: string, userId?: number) => {
    if(!discordId && !userId)
        return;
    const selectedUsers = await getMySQLUsers(
        {
            discordId: discordId,
            userId: userId
        }
    );
    if(!selectedUsers || selectedUsers.length < 1) 
        return;
    for(let i = 0; i < selectedUsers.length; i++) {
        if(!selectedUsers[i].id)
            continue;
        await pool.execute(`
            DELETE FROM deedsdb.users_progressions WHERE (userId = ${selectedUsers[i].id});
        `);
    };
    await pool.execute(`
        DELETE FROM deedsdb.users
        WHERE (
            ${
                discordId ?
                `discordId = ${discordId}` :
                `id = ${userId}`
            }
        );
    `);
};

const getNewDeedsInsertValues = (deedsList: IDeed[], userId: number, oldDeedsValue = '', index = 0): any => {
    if(index == deedsList.length)
        return oldDeedsValue;
    const deedsValue = oldDeedsValue + `
        ( ${deedsList[index].id}, ${userId}, 0 )${index === deedsList.length-1 ? ';' : ','}
    `;
    return getNewDeedsInsertValues(deedsList, userId, deedsValue, index+1);
};