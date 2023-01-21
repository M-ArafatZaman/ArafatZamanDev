import React, {Suspense} from 'react';
import Header from './header';
import Footer from './footer';
import Loader from './loader';
// Browser router
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from 'react-router-dom';
// @mui components
import {
    Box,
    useTheme
} from '@mui/material';
// Utils
import {LazyImport} from '../utils';
// Page components
const Home = LazyImport(() => import("../pages/home"));
const Portfolio = LazyImport(() => import("../pages/portfolio"));
const Projects = LazyImport(() => import("../pages/projects"));
const Blog = LazyImport(() => import("../pages/blog"));
const Contact = LazyImport(() => import("../pages/contact"));

// The main layout that is used throughout the app
export default function Index() {
    const theme = useTheme();
    
    // Create router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Suspense fallback={<Loader/>}><Home/></Suspense>
        },
        {
            path: "/portfolio/",
            element: <Suspense fallback={<Loader/>}><Portfolio/></Suspense>
        },
        {
            path: "/projects/",
            element: <Suspense fallback={<Loader/>}><Projects/></Suspense>
        },
        {
            path: "/blog/",
            element: <Suspense fallback={<Loader/>}><Blog/></Suspense>
        },
        {
            path: "/contact/",
            element: <Suspense fallback={<Loader/>}><Contact/></Suspense>
        }
    ]) 

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
                <RouterProvider router={router}/>
            </Box>
            <Footer/>
        </Box>
    );
}