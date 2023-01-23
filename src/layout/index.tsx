import React from 'react';
import Header from './header';
import Footer from './footer';
// Browser router
import { Outlet } from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
// App theme
import {APP_THEME} from '../appTheme';

// The main layout that is used throughout the app
export default function Index() {

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
}