"use client";

import type { IUserInfo } from '@/types';
import { useEffect, useState } from 'react';
import User from '../User/User';

import './UsersList.css';

const HOST = 'https://uacommunityhub.top/api';

const UsersList = () => {
    const [users, setUsers] = useState<IUserInfo[]>([]);

    useEffect(() => {
        fetch(HOST)
        .then(res => res.json())
        .then(
            (value: IUserInfo[]) => setUsers(value)
        );
    }, []);

    return (
        <div
            className={'deeds-list-wrapper'}
        >
            {
                users.map((item: IUserInfo, id: number) =>
                    <User
                        key={id}
                        {...item}
                    />
                )
            }
        </div>
    );
};


export default UsersList;