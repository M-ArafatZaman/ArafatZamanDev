import React, {useState, useEffect} from 'react';
import {useLoaderData} from '@remix-run/react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
// Marked, highlight js, and html react parser
import {marked} from 'marked';
import hljs from "highlight.js";
import htmlReactParser from 'html-react-parser';
// Other components
import AppCard from '../../home/components/AppCard';
import Error from '../../../components/Error';
// Types
import {ViewPortfolioItemAPIResponse} from '../types';
// Loader
import {ViewPortfolioItemLoader} from '../loader';
// Carousel component
import {replaceContentWithCarousel, replaceContentWithIphone} from '../../../components/Carousel';
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
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const width = useWidth();
    const APP_THEME = useTheme();
    
    // Check for hydration
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    
    // The data fetched from API
    const $data: ViewPortfolioItemAPIResponse = useLoaderData<typeof ViewPortfolioItemLoader>();
    // The content parsed and the javascript to execute
    const [content, setContent] = useState<ReturnType<typeof htmlReactParser>>();
    const [JS, setJS] = useState<string[]>([]);

    // Highlight all after hydration
    useEffect(() => {
        if (isHydrated && $data.status === "OK") {
            const contentMD: string = marked.parse($data.payload.content);
            // Replace to parse normal carousel and then parse iphone carousel
            const replacedWithCarousel = replaceContentWithCarousel(contentMD);
            const replacedFinal = replaceContentWithIphone(replacedWithCarousel.html);
            // Parse from html string to React jsx
            const contentMDParsed: JSX.Element | JSX.Element[] | string = htmlReactParser(replacedFinal.html);
            // Update states
            setContent(contentMDParsed);
            setJS([...replacedWithCarousel.js, ...replacedFinal.js]);
        }
    }, [isHydrated, $data]);
    
    // After the content is rendered
    useEffect(() => {
        // This is executed when the content is parsed
        hljs.highlightAll();
    }, [content]);

    // Execute javascript of all the carousel after the content is rendered
    useEffect(() => {
        // Execute the javascript after 1000ms
        JS.forEach((str) => {
            setTimeout(() => {
                eval(str);
            }, 1000);
        })
    }, [JS]);

    return (
        <Portfolio>
            <Grid container spacing={2}>
                {
                    !isHydrated ?
                    // A skeleton loader
                    <>
                        <Grid item xs={12} md={4}>
                            <Skeleton variant="rounded" height={500}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Skeleton variant="rounded" height={800}/>
                        </Grid>
                    </>    
                    :

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
                                    {$data.payload.tags.map((str, i) => <Chip label={str} size="small" color="info" sx={{mr: 1}} key={i}/>) }
                                    
                                    <Divider sx={{my: 2}}/>

                                    {/* Content */}
                                    <Typography component="div" sx={{
                                        "& img": {
                                            width: "100%",
                                            objectFit: "contain"
                                        }
                                    }}>
                                        {content}
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