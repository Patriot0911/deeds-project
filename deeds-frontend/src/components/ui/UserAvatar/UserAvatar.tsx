import { IUserAvatarProps } from '@/types';
import './UserAvatar.css';

const UserAvatar = ({ avatar }: IUserAvatarProps) => {
    return (
        <img
            className={'user-avatar'}
            src={avatar}
            alt={'user`s avatar'}
        />
    );
};

export default UserAvatar;
