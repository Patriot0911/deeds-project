export interface dbUser {
    id: number;
    discordId: string;
    username: string;
    avatar: string;
};

export interface dbDeed {
    id: number;
    deedName: string;
    goal: number;
};

export interface dbProgress {
    id: number;
    deedId: number;
    userId: number;
    progress: number;
};

export interface IUserInfo {
    name: string;
    avatar: string;
    progressions: IDeed[];
};

export interface IDeed {
    name: string;
    goal: number;
    current: number;
};

export interface IUsersFilter {
    deedId?: string;
    userId?: string;
    userName?: string;
};