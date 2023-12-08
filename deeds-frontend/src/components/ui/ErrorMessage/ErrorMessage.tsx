'use client';

import { IErrorMessageProps } from '@/types';
import openNewTab from '@/scripts/openNewTab';
import './ErrorMessage.css';

const DISCORD_URL = 'https://discord.gg/QP3tjK9XG2';

const ErrorMessage = ({ info }: IErrorMessageProps) => {
    return (
        <h2
            className={'error-message'}
            onClick={
                () => openNewTab(DISCORD_URL)
            }
        >
            {info}
        </h2>
    );
};

export default ErrorMessage;