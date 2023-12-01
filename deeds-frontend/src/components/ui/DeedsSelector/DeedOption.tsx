import { IDBDeed } from "@/types";

const DeedOption = (deed: IDBDeed) => {
    return (
        <option
            className={'deeds-option'}
            value={deed.id}
        >
            {deed.deedName}
        </option>
    );
};


export default DeedOption;