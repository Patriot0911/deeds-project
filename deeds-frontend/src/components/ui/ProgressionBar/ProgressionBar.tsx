import { IProgressionBarProps } from "@/types";

import './ProgressionBar.css';

const getProgress = (current: number, goal: number) => current/goal > 1.0 ? 100 : Math.floor(current/goal*100);

const ProgressionBar = (props: IProgressionBarProps) => {
    const progress = getProgress(props.current, props.goal);

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
                    width: `${progress < 2 ? 2 : progress}%`,
                    backgroundColor: progress !== 100 ? `rgba(51, 226, 182, 0.712)` : `rgba(255, 239, 96, 0.712)`
                }}
            />
        </div>
    );
};


export default ProgressionBar;
