import React, {useEffect, useReducer} from 'react';
import {Outlet} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import WorkIcon from '@mui/icons-material/Work';
// Example response for dev
import {PortfolioAPIResponse} from './types';
// Endpoints
import {BASE, GET_PORTFOLIO_ITEMS} from './ENDPOINT';
// Portfolio Context
import { 
    PortfolioContext,
    PortfolioReducer,
    PORTFOLIO_INITIAL_STATE,
    UPDATE_ITEMS,
    UPDATE_IS_LOADING
} from './portfolioContext';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const [pContext, dispatch] = useReducer(PortfolioReducer, PORTFOLIO_INITIAL_STATE);

    // Fetch data from API endpoint
    useEffect(() => {
        // Fetch
        fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
            method: "GET",
            mode: "cors"
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