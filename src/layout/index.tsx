import react from 'react';
import Header from './header';
import Footer from './footer';
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
// Page components
import Home from '../pages/home';
import Portfolio from '../pages/portfolio';
import Projects from '../pages/projects';

// The main layout that is used throughout the app
export default function Index() {
    const theme = useTheme();
    
    // Create router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/portfolio/",
            element: <Portfolio/>
        },
        {
            path: "/projects/",
            element: <Projects/>
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
            <Box flexGrow={1}>
                <RouterProvider router={router}/>
            </Box>
            <Footer/>
        </Box>
    );
}