import type { IPanelWrapperProps } from "@/types";

import './PanelWrapper.css';

const PanelWrapper = ({ children }: IPanelWrapperProps) => {
    return (
        <section
            className={'deeds-panel-wrapper'}
        >
            <h1>Deeds List</h1>
            {children}
        </section>
    )
};

export default PanelWrapper;