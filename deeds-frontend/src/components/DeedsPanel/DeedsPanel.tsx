import { IDeedsPanelProps } from '@/types';
import UsersList from '../UsersList/UsersList';

import './DeedsPanel.css';

const DeedsPanel = (props: IDeedsPanelProps) => {
    return (
        <section
            className={'deeds-panel-wrapper'}
        >
            <h1>Deeds List</h1>
            <UsersList
                {...props}
            />
        </section>
    );
};

export default DeedsPanel;
