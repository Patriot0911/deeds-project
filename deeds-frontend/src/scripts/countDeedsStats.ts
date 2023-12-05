import type { IUserInfo } from "@/types";

const countDeedsStats = (users: IUserInfo[], index = 0, count = 0): number => {
    const addCount = () => count + users[index].progressions.length;
    return users.length-1 === index ? addCount() : countDeedsStats(users, index+1, addCount());
} ;

export default countDeedsStats;