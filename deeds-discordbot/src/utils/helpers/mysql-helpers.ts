import { GuildMember } from 'discord.js';
import { getAvatar } from './helpers';
import { IDeed, IMySQLSearchParams, IUser } from 'src/types';
import mysql, { ResultSetHeader } from 'mysql2/promise';
import 'dotenv/config';

export const getMysqlConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME
    });
    return connection;
};

export const getMySQLDeeds = async (userId?: number) => {
    const connection = await getMysqlConnection();
    const [rawDeedsList] = await connection.execute(`
        SELECT * FROM deedsdb.deeds
        ${
            userId && `Where userId = ${userId}`
        };
    `);
    const deedsList = rawDeedsList as IDeed[];
    connection.end();
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

    const connection = await getMysqlConnection();
    const [rawSelectedUsers] = await connection.execute(`
        SELECT * FROM deedsdb.users
            ${searchParams ? searchParams : ''}
        ;
    `);
    await connection.end();
    return rawSelectedUsers as IUser[];
};

export const createMySQLDeed = async (name: string, goal: number) => {
    const connection = await getMysqlConnection();
    const [rawNewDeed] = await connection.execute(`
        Insert into deedsdb.deeds (deedName, goal)
        Values ('${name}', ${goal});
    `);
    connection.end();
    return rawNewDeed as ResultSetHeader;
};

export const createMySQLDeedsUser = async (member: GuildMember) => {
    const connection = await getMysqlConnection();
    const avatar = getAvatar(member);
    const insertedUser = (await connection.execute(`
        Insert into deedsdb.users (discordId, username, avatar) Values
        ('${member.id}', '${member.displayName}', '${avatar}');
    `))[0];
    if(!insertedUser) {
        await connection.end();
        return;
    };
    const deedsList = await getMySQLDeeds();
    if(!deedsList) {
        await connection.end();
        return;
    };

    const deedsValues = getNewDeedsInsertValues(deedsList, (insertedUser as ResultSetHeader).insertId);
    if(!deedsValues) {
        await connection.end();
        return;
    };
    await connection.execute(`
        Insert into deedsdb.users_progressions (deedId, userId, progress)
            Values ${deedsValues};
    `);

    await connection.end();
    return insertedUser as ResultSetHeader;
};

export const deleteMySQLUsers = async (discordId?: string, userId?: number) => {
    if(!discordId && !userId)
        return;
    const connection = await getMysqlConnection();
    const selectedUsers = await getMySQLUsers(
        {
            discordId: discordId,
            userId: userId
        }
    );
    if(!selectedUsers || selectedUsers.length < 1) {
        await connection.end();
        return;
    };
    for(let i = 0; i < selectedUsers.length; i++) {
        if(!selectedUsers[i].id)
            continue;
        await connection.execute(`
            DELETE FROM deedsdb.users_progressions WHERE (userId = ${selectedUsers[i].id});
        `);
    };
    await connection.execute(`
        DELETE FROM deedsdb.users
        WHERE (
            ${
                discordId ?
                `discordId = ${discordId}` :
                `id = ${userId}`
            }
        );
    `);
    await connection.end();
};

const getNewDeedsInsertValues = (deedsList: IDeed[], userId: number, oldDeedsValue = '', index = 0): any => {
    if(index == deedsList.length)
        return oldDeedsValue;
    const deedsValue = oldDeedsValue + `
        ( ${deedsList[index].id}, ${userId}, 0 )${index === deedsList.length-1 ? ';' : ','}
    `;
    return getNewDeedsInsertValues(deedsList, userId, deedsValue, index+1);
};