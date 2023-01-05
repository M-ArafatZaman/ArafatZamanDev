import react from 'react';
import Header from './header';
// @mui components
import {
    Box,
    useTheme
} from '@mui/material';
// Page components
import Home from '../pages/home';

// The main layout that is used throughout the app
export default function Index() {
    const theme = useTheme();

    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
            position: "relative"
        }}>
            <Header/>
            <Home/>
        </Box>
    );
}