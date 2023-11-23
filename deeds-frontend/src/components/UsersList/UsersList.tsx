import type { IUserInfo } from '@/types';
import User from '../User/User';

import './UsersList.css';

const APIURL = 'http://localhost:3001/';

const UsersList = async() => {
    const res = await fetch(APIURL, {
        cache: 'no-store'
    });
    if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    };
    const users: IUserInfo[] = await res.json();

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