import { IErrorMessageProps } from '@/types';
import './ErrorMessage.css';

const ErrorMessage = ({ info }: IErrorMessageProps) => {
    return (
        <h2
            className={'error-message'}
        >
            {info}
        </h2>
    );
};

export default ErrorMessage;