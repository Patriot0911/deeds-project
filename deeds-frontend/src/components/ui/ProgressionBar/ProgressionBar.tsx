import { IProgressionBarProps } from "@/types";
import { useState, useEffect } from "react";

import './ProgressionBar.css';

const ProgressionBar = (props: IProgressionBarProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const getProgress = () => props.current/props.goal > 1.0 ? 100 : Math.floor(props.current/props.goal*100);
        setProgress(getProgress());
    }, [props.goal, props.current]);

    return (
        <div
            className={'back-progress'}
        >
            {
                props.name && <h3 className={'progress-name'}> {props.name} </h3>
            }
            <h2
                className={'progress-status'}
            >
                {props.current}/{props.goal}
            </h2>
            <div
                className={'progress'}
                style={{
                    width: `${progress}%`
                }}
            />
        </div>
    );
};


export default ProgressionBar;
