import { IUserInfoBlockProps } from "@/types";
import UserNameBox from "../ui/UserName/UserName";
import ProgressionsList from "../ProgressionsList/ProgressionsList";

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
