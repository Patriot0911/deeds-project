import { ReactNode } from "react";

export interface IChildrenProps {
    children: React.ReactNode;
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

export interface IDBDeed {
    id: number;
    deedName: string;
    goal: number;
};

export interface IUserNameBoxProps {
    name: string;
};

export interface IUserInfoBlockProps extends IUserInfo {
    isOpen: boolean;
};

export interface IProgressionBarProps {
    goal: number;
    current: number;
    name?: string;
};

export interface IProgressionsListProps {
    isOpen: boolean;
    progressions: IDeed[];
};

export interface ISearchDeedsPageProps {
    params: {
        deedId: number;
    }
};

export interface IDeedsSelectorProps {
    deedsList: IDBDeed[];
};

export interface IDeedsPanelProps {
    filter?: {
        deedId?: number;
        userName?: string;
    };
};

export interface IUserListProps {
    users: IUserInfo[];
};

export interface IPanelWrapperProps {
    children: ReactNode;
};