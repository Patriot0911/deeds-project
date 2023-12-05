'use client';
import { IDeedsSelectorProps } from "@/types";
import getListWithSelectedDeed from "@/scripts/getDeedsWithSelectedId";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import DeedOption from "./DeedOption";
import './DeedsSelector.css';

const DeedsSelector = ({ deedsList, curDeedId }: IDeedsSelectorProps) => {
    const router = useRouter()

    const deedsSelectCallback = (eventData: ChangeEvent<HTMLSelectElement>) => {
        const optionValue = parseInt(eventData.target.value);
        console.log(optionValue);
        if(!optionValue) {
            router.push(`/`);
            return;
        }
        router.push(`/deeds/${optionValue}`);
    };

    return (
        <select
            className={'deeds-selector'}
            onChange={deedsSelectCallback}
        >
            {
                getListWithSelectedDeed(deedsList, curDeedId).map(
                    (deed, index) =>
                    <DeedOption
                        {...deed}
                        key={index}
                    />
                )
            }
        </select>
    );
};

export default DeedsSelector;