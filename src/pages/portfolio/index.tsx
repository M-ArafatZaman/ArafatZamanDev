import React, {useEffect, useReducer} from 'react';
import {Outlet} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import WorkIcon from '@mui/icons-material/Work';
// @types
import {PortfolioAPIResponse} from './types';
// Endpoints
import {BASE, GET_PORTFOLIO_ITEMS} from './ENDPOINT';
// Portfolio Context
import { 
    PortfolioContext,
    PortfolioReducer,
    PORTFOLIO_INITIAL_STATE,
    // Action types
    UPDATE_ITEMS,
    UPDATE_IS_LOADING,
    DELETE_ITEMS
} from './reducer';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const [pContext, dispatch] = useReducer(PortfolioReducer, PORTFOLIO_INITIAL_STATE);

    // Fetch data from API endpoint
    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        // Fetch
        fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
            method: "GET",
            mode: "cors",
            signal: signal
        })
        .then((response) => response.json())
        .then((response: PortfolioAPIResponse) => {
            if (response.status === "OK") {
                //setItems(response.items);
                dispatch({
                    type: UPDATE_ITEMS,
                    payload: {
                        items: response.items
                    }
                })
            }
        })
        .finally(() => {
            dispatch({
                type: UPDATE_IS_LOADING,
                payload: {
                    isLoading: false
                }
            })
        })

        // Destructor to delete all the items in context
        return () => {
            dispatch({
                type: DELETE_ITEMS,
                payload: {}
            })
            // Abort fetch when the component is unmounted
            controller.abort();
        }

    }, []);
    
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