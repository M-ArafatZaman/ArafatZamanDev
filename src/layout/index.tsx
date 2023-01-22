import React, {Suspense} from 'react';
import Header from './header';
import Footer from './footer';
import Loader from './loader';
// Browser router
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    BrowserRouter,
    Outlet
} from 'react-router-dom';
// @mui components
import {
    Box,
    useTheme
} from '@mui/material';
// Utils
import {LazyImport, FadeInWrapper} from '../utils';
// Page components
const Home = LazyImport(() => import("../pages/home"));
const Portfolio = LazyImport(() => import("../pages/portfolio"));
const Projects = LazyImport(() => import("../pages/projects"));
const Blog = LazyImport(() => import("../pages/blog"));
const Contact = LazyImport(() => import("../pages/contact"));

// The main layout that is used throughout the app
export default function Index() {
    const theme = useTheme();
    

    return (
        <Box sx={{
            maxWidth: "100vw",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.paper,
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