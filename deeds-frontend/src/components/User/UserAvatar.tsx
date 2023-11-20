
const UserAvatar = ({ avatar }: { avatar: string }) => {
    return (
        <img
            className={'user-avatar'}
            src={avatar}
        />
    );
};

export default UserAvatar;
