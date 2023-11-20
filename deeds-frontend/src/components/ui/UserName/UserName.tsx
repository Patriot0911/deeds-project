import { IUserNameBoxProps } from "@/types";

import './UserName.css';

const UserNameBox = ({ name }: IUserNameBoxProps) => {
    return (
        <div
            className={'name-box'}
        >
            {name}
        </div>
    );
};

export default UserNameBox;