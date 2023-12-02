'use client';
import { IDeedsSelectorProps } from "@/types";
import DeedOption from "./DeedOption";
import { redirect } from "next/navigation";
import { ChangeEvent } from "react";
import './DeedsSelector.css';

const DeedsSelector = ({ deedsList }: IDeedsSelectorProps) => {
    const deedsSelectCallback = (eventData: ChangeEvent<HTMLSelectElement>) => {
        const optionValue = eventData.target.value;
        if(optionValue)
            return;
        redirect(
            `http://localhost:3000/deeds/${optionValue}`
        )
    };
    return (
        <select
            className={'deeds-selector'}
            onChange={deedsSelectCallback}
        >
            {
                deedsList?.map(
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