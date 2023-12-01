import { IUserInfo } from "../types";
import { getDbUsers } from "../utils/mysql";

const indexRouter = async (req, res) => {
    const reqDeedId: string = req.query.id;
    const users: IUserInfo[] = [];
    const { deeds, dbUsers, progresses } = await getDbUsers({
        deedId: reqDeedId
    });

    const deedsMap = new Map(deeds.map(
        item => [item.id, item]
    ));
    const deedsIdList = Array.from(deedsMap.keys());

    for(let i = 0; i < dbUsers.length; i++) {
        const usersProgressions = progresses.filter(
            item => (
                item.userId === dbUsers[i].id &&
                deedsIdList.includes(item.deedId)
            )
        );
        const progressArray = usersProgressions.map(item => {
                const deedInfo = deedsMap.get(item.deedId);
                return {
                    name: deedInfo!.deedName,
                    current: item.progress,
                    goal: deedInfo!.goal
                };
            }
        );
        users.push({
            avatar: dbUsers[i].avatar,
            name: dbUsers[i].username,
            progressions: progressArray
        });
    };
    res.status(progresses.length < 1 ? 400 : 200)
        .json({
            deeds: deeds,
            users: users
        });
};


export default indexRouter;