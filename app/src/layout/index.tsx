import React, {useEffect} from 'react';
import Header from './header';
import Footer from './footer';
// Browser router
import { Outlet, useLocation } from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
// App theme
import {APP_THEME} from '../appTheme';

// The main layout that is used throughout the app
const Index: React.FC = () => {

    const location = useLocation();
    // Add event listener so that window scrolls to the top whenever location changes
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location.pathname]);

    return (
        <Box sx={{
            maxWidth: "100vw",
            minHeight: "100vh",
            backgroundColor: APP_THEME.palette.background.paper,
            position: "relative",
            overflowX: "hidden",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column"
        }}>
            <Header/>
            <Box display="flex" flexGrow={1} flexDirection="column">
                <Outlet/>
            </Box>
            <Footer/>
        </Box>
    );
};

export default Index;