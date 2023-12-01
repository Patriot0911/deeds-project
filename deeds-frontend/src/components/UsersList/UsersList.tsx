import type { IDBDeed, IUserInfo, IUserListProps } from '@/types';
import DeedsSelector from '../ui/DeedsSelector/DeedsSelector';
import User from '../User/User';

import './UsersList.css';

const APIURL = 'http://localhost:3001';

const UsersList = async(props: IUserListProps) => {
    const deedId = props.filter?.deedId;
    const res = await fetch(APIURL + (deedId ? `?id=${deedId}` : ''), {
        cache: 'no-store'
    });
    const data = await res.json();
    const users: IUserInfo[] = data.users;
    const deedsList: IDBDeed[] = data.deeds;

    return (
        <div
            className={'deeds-list-wrapper'}
        >
            <DeedsSelector
                deedsList={deedsList}
            />
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