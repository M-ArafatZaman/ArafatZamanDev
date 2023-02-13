import React from 'react';
// @mui components
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useTheme from '@mui/material/styles/useTheme';

interface ErrorProps {
    message?: string;
}

const Error: React.FC<ErrorProps> = (props: ErrorProps) => {
    /* 
    A simple abstract component to show error throughout the app
    */
    const {message} = props;
    const APP_THEME = useTheme();

    return (
        <Alert severity='error' variant="standard" sx={{boxShadow: APP_THEME.shadows["1"]}}>
            <AlertTitle>Error</AlertTitle>
                {message}
        </Alert>
    )
};

export default Error;