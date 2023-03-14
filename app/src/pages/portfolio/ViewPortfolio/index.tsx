import React, {useState, useEffect} from 'react';
import {useLoaderData} from '@remix-run/react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
// Marked, highlight js, and html react parser
import hljs from "highlight.js";
import htmlReactParser from 'html-react-parser';
// Other components
import AppCard from '../../home/components/AppCard';
import Error from '../../../components/Error';
// Types
import {ViewPortfolioItemAPIResponse} from '../types';
// Loader
import {ViewPortfolioItemLoader} from '../loader';
// Navbar
import ViewPortfolioNavbar from './ViewPortfolioNavbar';
import Portfolio from '../index';
// Util functions
import {useWidth} from '../../../utils';


/* 
The view portfolio page component that retrieves a single portfolio item 
from the server and renders it.
It is a page component. It receives the slug parameter from the browserrouter API.
*/
const ViewPortfolio: React.FC = () => {
    const width = useWidth();
    const APP_THEME = useTheme();
    
    // The data fetched from API
    const $data: ViewPortfolioItemAPIResponse = useLoaderData<typeof ViewPortfolioItemLoader>();

    // After the content is rendered
    useEffect(() => {
        // This is executed when the content is parsed
        hljs.highlightAll();
        if ($data.status === "OK") {
            $data.payload.js.forEach((scripts) => {
                setTimeout(() => eval(scripts), 100);
            });
        }
    }, [$data]);

    return (
        <Portfolio>
            <Grid container spacing={2}>
                {

                    // If there is an from the loader, then there has been some sort of error occured
                    $data.status === "Error" ? 
                    <Grid item xs={12}><Error message="Sorry, an unknown server error occured!" /></Grid>
                    :

                    // If there is not an error from loader, but the response is not OK, that means that 
                    // No portfolio has been found
                    $data.status !== "OK" ?
                    <Grid item xs={12}><Error message="Not found." /></Grid>
                    :
                    
                    // Else found a portfolio item
                    <>
                        {/* Portfolio Navbar */}
                        <Grid item xs={12} md={4} sx={{position: "relative"}}>
                            <ViewPortfolioNavbar other_portfolio_items={$data.payload.other_portfolio_items} />
                        </Grid>

                        {/* Portfolio content */}
                        <Grid item xs={12} md={8}>
                            <AppCard>
                                <Box py={3} px={width >= APP_THEME.breakpoints.values["md"] ? 3 : 2}>
                                    {/* Header and tags */}
                                    <Typography variant="h4" sx={{textDecoration: "underline", mb: 1}}>{$data.payload.name}</Typography>
                                    {$data.payload.tags.map((str, i) => <Chip label={str} size="small" color="info" sx={{m: .5, ml: 0}} key={i}/>) }
                                    
                                    <Divider sx={{my: 2}}/>

                                    {/* Content */}
                                    <Typography component="div" sx={{
                                        "& img": {
                                            width: "100%",
                                            objectFit: "contain"
                                        }
                                    }}>
                                        {htmlReactParser($data.payload.md)}
                                    </Typography>
                                </Box>
                            </AppCard>
                        </Grid>
                    </>

                }
            </Grid>
        </Portfolio>
    )
};

export default ViewPortfolio;