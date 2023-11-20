import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import { IUserInfo, IDeed, dbDeed, dbUser, dbProgress } from './types';

const app = express();
const port = 3001;

const dbInfo = {
    database: 'deedsdb', // database
    user: 'nextuser', // username
    password: 'NotRootNextPass_0922', // password
    host: 'localhost' // host
};

app.use(cors({
    origin: true,
    credentials: true
}));

app.get('/', async (req, res) => {
    const users: IUserInfo[] = [];
    const {
        deeds,
        dbUsers,
        progresses
    } = await getDbUsers();
    const deedsMap = new Map(deeds.map(
        item => [item.id, item]
    ));

    for(let i = 0; i < dbUsers.length; i++) {
        const progressArray: IDeed[] = [];
        for(let k = 0; k < progresses.length; k++) {
            if(progresses[k].userId !== dbUsers[i].id)
                continue;
            const deedInfo = deedsMap.get(progresses[k].deedId);
            if(!deedInfo)
                continue;
            progressArray.push({
                name: deedInfo.deedName,
                current: progresses[k].progress,
                goal: deedInfo.goal
            });
        };
        users.push({
            avatar: dbUsers[i].avatar,
            name: dbUsers[i].username,
            progressions: progressArray
        });
    };
    res.json(users);
});

const getDbUsers = async () => {
    const connection = await mysql.createConnection(dbInfo);
    const [rawUsersData] = await connection.execute(`
        Select * from deedsdb.users;
    `);
    const [rawProgressions] = await connection.execute(`
        Select * from deedsdb.users_progressions;
    `);
    const [rawDeeds] = await connection.execute(`
        Select * from deedsdb.deeds;
    `);
    connection.end();

    return {
        deeds: rawDeeds as dbDeed[],
        dbUsers: rawUsersData as dbUser[],
        progresses: rawProgressions as dbProgress[]
    };
};

app.listen(port);