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