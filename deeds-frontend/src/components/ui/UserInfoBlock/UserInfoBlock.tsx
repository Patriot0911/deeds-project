import { IUserInfoBlockProps } from "@/types";
import UserNameBox from "../UserName/UserName";
import ProgressionsList from "../../ProgressionsList/ProgressionsList";

import './UserInfoBlock.css';

const UserInfoBlock = (props: IUserInfoBlockProps) => {
    return (
        <div
            className={'info-block'}
        >
            <div
                className={'items-down'}
            >
                <UserNameBox
                    name={props.name}
                />
                <ProgressionsList
                    progressions={props.progressions}
                    isOpen={props.isOpen}
                />
            </div>
        </div>
    );
};

export default UserInfoBlock;
