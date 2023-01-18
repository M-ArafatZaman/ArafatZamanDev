import react from 'react';
import Header from './header';
import Footer from './footer';
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
            maxWidth: "100vw",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.paper,
            position: "relative",
            overflowX: "clip",
            overflowY: "auto"
        }}>
            <Header/>
            <Home/>
            <Footer/>
        </Box>
    );
}