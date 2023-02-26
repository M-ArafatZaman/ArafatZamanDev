import React, {useEffect, useReducer} from 'react';
import {Outlet, useLoaderData} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import WorkIcon from '@mui/icons-material/Work';
// @types
import {PortfolioAPIResponse} from './types';
// Portfolio Context
import { 
    PortfolioContext,
    PortfolioReducer,
    PORTFOLIO_INITIAL_STATE,
    // Action types
    UPDATE_ITEMS,
    UPDATE_IS_LOADING,
    DELETE_ITEMS,
    ERROR,
    INITIALIZE
} from './reducer';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const [pContext, dispatch] = useReducer(PortfolioReducer, PORTFOLIO_INITIAL_STATE);
    const data = useLoaderData() as {response: Promise<Response>};

    // Initialize when the component is mounted and delete when the component is unmounted
    useEffect(() => {
        dispatch({type: INITIALIZE});
        return () => {
            dispatch({type: DELETE_ITEMS});
        }
    }, [])

    // Fetch data from API endpoint
    useEffect(() => {
        data.response
        .then((resp) => resp.json())
        .then((resp: PortfolioAPIResponse) => {
            console.log(resp);
            if (resp.status === "OK") {
                // Received all items successfully
                dispatch({
                    type: UPDATE_ITEMS,
                    payload: {items: resp.items}
                })
            } else {
                throw "Unexpected response";
            }
        })
        .catch(() => {
            // An error occured
            dispatch({
                type: ERROR,
                payload: {errorMessage: "Sorry, an unknown error occured."}
            })
        })
        .finally(() => {
            dispatch({type: UPDATE_IS_LOADING, payload: {isLoading: false}});
        })
    }, [data]);
    
    return (
        <Container sx={{py: 2}}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="center">
                <WorkIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Portfolio</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* Portfolio cards */}
            <PortfolioContext.Provider value={pContext}>
                <Outlet/>
            </PortfolioContext.Provider>
        </Container>
    );
};

export default Portfolio;