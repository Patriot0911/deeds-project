import { IDBDeed } from "@/types";

const notSelectedDeed: IDBDeed = {
    id: 0,
    deedName: 'Not Selected',
    goal: 0
};

const getListWithSelectedDeed = (deedsList: IDBDeed[], curDeedId: number | undefined) =>  {
    const selectedDeedList = [...deedsList];
    selectedDeedList.unshift(notSelectedDeed);
    if(!curDeedId)
        return selectedDeedList;
    const index = selectedDeedList.findIndex(item => item.id == curDeedId);
    if(index !== -1)
        selectedDeedList.unshift(...selectedDeedList.splice(index, 1))
    return selectedDeedList;
};

export default getListWithSelectedDeed;