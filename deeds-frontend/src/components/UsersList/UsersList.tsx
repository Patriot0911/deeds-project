import type { IUserInfo, IUserListProps } from '@/types';
import User from '../User/User';

import './UsersList.css';

const APIURL = 'http://localhost:3001';

const UsersList = async(props: IUserListProps) => {
    const deedId = props.filter?.deedId;
    const res = await fetch(APIURL + (deedId ? `?id=${deedId}` : ''), {
        cache: 'no-store'
    });
    const users: IUserInfo[] = await res.json();

    return (
        <div
            className={'deeds-list-wrapper'}
        >
            {
                !res.ok ?
                <h3>Something went wrong. Please Try again [{res.status}]</h3> :
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