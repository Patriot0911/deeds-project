import Image from "next/image";

import './UserAvatar.css';

const UserAvatar = ({ avatar }: { avatar: string }) => {
    return (
        <img
            className={'user-avatar'}
            // width={125}
            // height={125}
            src={avatar}
            alt={'user`s avatar'}
        />
    );
};

export default UserAvatar;
