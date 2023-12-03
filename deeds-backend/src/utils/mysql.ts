import mysql from 'mysql2/promise';
import dbConnectionInfo from '../configs/db.json';
import { IUsersFilter, dbDeed, dbProgress, dbUser } from '../types';

export const pool = mysql.createPool(dbConnectionInfo);

export const getDbUsers = async (filter?: IUsersFilter) => {
    const deedsList = await getListOfDeeds();
    const usersList = await getListOfUsers();
    const progressions = await getUsersPorgressions(filter?.deedId);
    return {
        deeds: deedsList,
        dbUsers: usersList,
        progresses: progressions
    };
};

export const getListOfUsers = async () => {
    const [rawUsersList] = await pool.execute(`
        Select * from deedsdb.users;
    `);
    const usersList = rawUsersList as dbUser[];
    if(!usersList || usersList.length < 1)
        return [];
    return usersList;
};
export const getUsersPorgressions = async (deedId?: string | number) => {
    const [rawProgressions] = await pool.execute(`
        Select * from deedsdb.users_progressions
        ${
            deedId && `Where deedId = ${deedId}`
        };
    `);
    const progressions = rawProgressions as dbProgress[];
    if(!progressions || progressions.length < 1)
        return [];
    return progressions;
};
export const getListOfDeeds = async () => {
    const [rawDeedsList] = await pool.execute(`
        Select * from deedsdb.deeds;
    `);
    const deedsList = rawDeedsList as dbDeed[];
    if(!deedsList || deedsList.length < 1)
        return [];
    return deedsList;
};