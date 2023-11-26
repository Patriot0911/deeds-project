import { IDeed, IProgressionsListProps } from "@/types";
import { useState, useEffect } from "react";
import ProgressionBar from "../ui/ProgressionBar/ProgressionBar";

import './ProgressionsList.css';

const ProgressionsList = ({ isOpen, progressions }: IProgressionsListProps) => {
    const [totalInfo, setTotalInfo] = useState(
        {
            current: 0,
            goal: 0
        }
    );

    useEffect(() => {
        const info = {
            current: 0,
            goal: 0
        };
        progressions.map((item) => {
            info.current += item.current;
            info.goal += item.goal;
        });
        setTotalInfo(info);
    }, [progressions]);

    return (
        <div
            className={'progressions-list'}
        >
            <ProgressionBar
                current={totalInfo.current}
                goal={totalInfo.goal}
            />
            {
                (isOpen && progressions.length > 1) &&
                progressions.map((item: IDeed, index) =>
                    <ProgressionBar
                        {...item}
                        key={index}
                    />
                )
            }
        </div>
    );
};

export default ProgressionsList;
