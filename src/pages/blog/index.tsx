import React, {useEffect, useReducer} from 'react';
import {Outlet} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import FeedIcon from '@mui/icons-material/Feed';
// Blog types
import {GetBlogsAPIResponse} from './types';
// Endpoints
import {BASE, GET_BLOGS} from './ENDPOINT';
// Context
import {
    BlogsContext,
    BlogsReducer,
    BLOGS_INITIAL_STATE,
    // Action types
    INITIALIZE,
    UPDATE_ITEMS,
    UPDATE_IS_LOADING,
    DELETE_DATA,
    ERROR
} from './reducer';


/* The Blog page */
const BlogItems: React.FC = () => {

    const [pContext, dispatch] = useReducer(BlogsReducer, BLOGS_INITIAL_STATE);

    // Fetch data from API endpoint
    useEffect(() => {
        // Abort controller
        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;

        // Dispatch an initialize request
        dispatch({type: INITIALIZE});

        // Fetch
        fetch(`${BASE}${GET_BLOGS}`, {
            method: "GET",
            mode: "cors",
            signal: signal
        })
        .then((response) => response.json())
        .then((response: GetBlogsAPIResponse) => {
            if (response.status === "OK") {
                // Found all blogs
                dispatch({
                    type: UPDATE_ITEMS,
                    payload: {
                        items: response.response
                    }
                })
            } else {
                // An error occured while getting blogs
                dispatch({ type: ERROR, payload: {errorMessage: "Sorry, an uncaught server error occured."}});
            }
        })
        .catch(() => {
            // An error occured
            dispatch({ type: ERROR, payload: {errorMessage: "Sorry, an uncaught error occured."}})
        })
        .finally(() => {
            dispatch({
                type: UPDATE_IS_LOADING,
                payload: {
                    isLoading: false
                }
            })
        })

        // A destructor to empty the context for optimization
        return () => {
            dispatch({ type: DELETE_DATA })
            controller.abort();
        }
    }, []);
    
    return (
        <Container sx={{py: 2}}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <FeedIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Blogs</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* Portfolio cards */}
            <BlogsContext.Provider value={pContext}>
                <Outlet/>
            </BlogsContext.Provider>
        </Container>
    );
};

export default BlogItems;