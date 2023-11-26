'use client';
import { IUserInfo } from "@/types";
import { useState } from "react";

import DeedInfoBlock from "./UserInfoBlock";
import DeedAvatar from "./UserAvatar";

import './User.css';

const User = (props: IUserInfo) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const switchOpenCallback = () => setIsOpen((state) => !state);

    return (
        <div
            className={isOpen ? 'user-wrapper open' : 'user-wrapper'}
            onClick={switchOpenCallback}
        >
            <DeedAvatar
                avatar={props.avatar}
            />
            <DeedInfoBlock
                {...props}
                isOpen = {isOpen}
            />
        </div>
    );
};

export default User;
