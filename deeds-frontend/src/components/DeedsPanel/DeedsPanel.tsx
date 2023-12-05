import type { IDeedsPanelProps } from '@/types';
import PanelWrapper from '../ui/PanelWrapper/PanelWrapper';
import ErrorMessage from '../ui/ErrorMessage/ErrorMessage';
import SuccessPanelInfo from './SuccessPanelInfo';
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
                    currentDeed={props.filter?.deedId}
                /> :
                <ErrorMessage
                    info={'Request error. Try again later'}
                />
            }
        </PanelWrapper>
    );
};

export default DeedsPanel;
