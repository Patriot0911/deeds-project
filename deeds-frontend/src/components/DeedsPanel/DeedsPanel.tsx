import type { IDeedsPanelProps } from '@/types';
import UsersList from '../UsersList/UsersList';
import DeedsSelector from '../ui/DeedsSelector/DeedsSelector';
import PanelWrapper from '../ui/PanelWrapper/PanelWrapper';
import getFetchData from '@/scripts/fetch';

import './DeedsPanel.css';

const APIURL = 'http://localhost:3001/';

const DeedsPanel = async (props: IDeedsPanelProps) => {
    const fetchURL = [APIURL, props.filter?.deedId].join('?id=');
    const res = await getFetchData(fetchURL);
    return (
        <PanelWrapper>
            {
                res ?
                <SuccessPanelInfo
                    data={await res.json()}
                /> :
                <ErrorPanelInfo />
            }
        </PanelWrapper>
    );
};

const SuccessPanelInfo = async ({ data }: { data: any }) => {
    return (
        <>
            <DeedsSelector
                deedsList={data.deeds}
            />
            <UsersList
                users={data.users}
            />
        </>
    );
};

const ErrorPanelInfo = () => {
    return (
        <h1>
            Request error. Try again later
        </h1>
    );
};

export default DeedsPanel;
