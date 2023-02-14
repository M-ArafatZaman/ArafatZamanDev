import React from 'react';
// @mui components
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useTheme from '@mui/material/styles/useTheme';


const P404: React.FC = () => {
    const APP_THEME = useTheme();

    return (
        <Container sx={{p: 2}}>
            <Alert severity='error' sx={{boxShadow: APP_THEME.shadows[1]}}>
                <AlertTitle>Error 404</AlertTitle>
                Page not found.
            </Alert>
        </Container>
    )
};

export default P404;
