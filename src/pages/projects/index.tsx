import React, {useEffect, useReducer} from 'react';
import {Outlet} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import TerminalIcon from '@mui/icons-material/Terminal';
// @types
import {GetProjectsAPIResponse} from './types';
// Endpoints
import {BASE, GET_PROJECTS_ITEMS} from './ENDPOINT';
// projects Context
import { 
    ProjectsContext,
    ProjectsReducer,
    INITIAL_PROJECTS_CONTEXT,
    // Action types
    UPDATE_ITEMS,
    UPDATE_IS_LOADING,
    DELETE_ITEMS,
    ERROR
} from './reducer';

/* The portfolio page */
const Portfolio: React.FC = () => {

    const [pContext, dispatch] = useReducer(ProjectsReducer, INITIAL_PROJECTS_CONTEXT);

    // Fetch data from API endpoint
    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        // Initialize loading
        dispatch({
            type: UPDATE_IS_LOADING,
            payload: {isLoading: true}
        })

        // Fetch
        fetch(`${BASE}${GET_PROJECTS_ITEMS}`, {
            method: "GET",
            mode: "cors",
            signal: signal
        })
        .then((response) => response.json())
        .then((response: GetProjectsAPIResponse) => {
            if (response.status === "OK") {
                //setItems(response.items);
                dispatch({
                    type: UPDATE_ITEMS,
                    payload: {
                        items: response.items
                    }
                })
            } else {
                // An error occured
                dispatch({
                    type: ERROR,
                    payload: {errorMessage: "Sorry, an unknown server error occured!"}
                })
            }
        })
        .catch(() => {
            // Couldnt connect to the server
            dispatch({
                type: ERROR,
                payload: {errorMessage: "Sorry, an unknown server error occured!"}
            })
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
                <TerminalIcon fontSize="large" sx={{mr: 1}}/>
                <Typography variant="h4">Projects</Typography>
            </Box>
            <Divider sx={{mt: 1, mb: 2}}/>

            {/* Portfolio cards */}
            <ProjectsContext.Provider value={pContext}>
                <Outlet/>
            </ProjectsContext.Provider>
        </Container>
    );
};

export default Portfolio;