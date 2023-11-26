
const UserAvatar = ({ avatar }: { avatar: string }) => {
    return (
        <img
            className={'user-avatar'}
            src={avatar}
            alt={'user`s avatar'}
        />
    );
};

export default UserAvatar;
