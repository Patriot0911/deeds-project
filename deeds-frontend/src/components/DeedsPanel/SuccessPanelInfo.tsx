import type { ISuccessPanelInfoProps, IDBDeed, IUserInfo } from "@/types";
import countDeedsStats from "@/scripts/countDeedsStats";
import UsersList from "../UsersList/UsersList";
import DeedsSelector from "../ui/DeedsSelector/DeedsSelector";
import ErrorMessage from "../ui/ErrorMessage/ErrorMessage";

const SuccessPanelInfo = async ({ data, currentDeed }: ISuccessPanelInfoProps) => {
    const deeds: IDBDeed[] | undefined = data.deeds;
    const users: IUserInfo[] | undefined = data.users;
    return (
        (!deeds || !users || (users && !countDeedsStats(users))) ?
        <ErrorMessage
            info={'The data is invalid. Please contact the administrator'}
        /> :
        <>
            <DeedsSelector
                deedsList={data.deeds}
                curDeedId={currentDeed}
            />
            <UsersList
                users={data.users}
            />
        </>
    );
};

export default SuccessPanelInfo;