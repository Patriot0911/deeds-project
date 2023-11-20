import UsersList from '../UsersList/UsersList';

import './DeedsPanel.css';

const DeedsPanel = () => {
    return (
        <section
            className={'deeds-panel-wrapper'}
        >
            <h1>Deeds List</h1>
            <UsersList />
        </section>
    );
};

export default DeedsPanel;
