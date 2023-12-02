import type { IUserInfo, IUserListProps } from '@/types';
import User from '../User/User';

import './UsersList.css';

const UsersList = ({ users }: IUserListProps) => {

    return (
        <div
            className={'deeds-list-wrapper'}
        >
            {
                users?.map((item: IUserInfo, id: number) =>
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