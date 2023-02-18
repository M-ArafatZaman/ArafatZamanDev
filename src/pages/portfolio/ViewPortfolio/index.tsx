import React, {useState, useEffect} from 'react';
import {useParams, useLoaderData} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
// Marked, highlight js, and html react parser
import {marked} from 'marked';
import hljs from "highlight.js";
import htmlReactParser from 'html-react-parser';
// Other components
import AppCard from '../../home/components/AppCard';
import Error from '../../../components/Error';
// Types
import {ViewPortfolioItemAPIResponse, PortfolioItem} from '../types';
// Carousel component
import {replaceContentWithCarousel, replaceContentWithIphone} from '../../../components/Carousel';
// Navbar
import ViewPortfolioNavbar from './ViewPortfolioNavbar';

/* 
The view portfolio page component that retrieves a single portfolio item 
from the server and renders it.
It is a page component. It receives the slug parameter from the browserrouter API.
*/
const ViewPortfolio: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PortfolioItem>();
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("Not found");
    const [parsedContent, setParsedContent] = useState<JSX.Element | JSX.Element[] | string>();
    const [parsedJavascript, setParsedJavascript] = useState<string[]>([]);
    // The data fetched from API
    const dataAPI = useLoaderData() as {response: Promise<Response>};
    
    // Function to initialize and delete all state data
    const init = () => {
        setIsLoading(true); setData(undefined); setError(false); setErrorMessage("");
        setParsedContent(undefined); setParsedJavascript([]);
    };

    // On component mount and unmount, clear the data
    useEffect(() => {
        init();
        return () => init();  
    }, [])

    // Using the data fetched from the loader
    useEffect(() => {
        // Initialize first
        init();
        // Work with data
        dataAPI.response
        .then((response) => response.json())
        .then((response: ViewPortfolioItemAPIResponse) => {
            if (response.status == "OK") {
                // Found item
                setData(response.payload);
                setError(false);
                // Parse content and replace with carousel
                const contentMD = marked.parse(response.payload.content);
                const ReplacedContent1 = replaceContentWithCarousel(contentMD);
                const ReplacedContentFinal = replaceContentWithIphone(ReplacedContent1.html);
                // Replace with carousel
                const contentMDParsed = htmlReactParser(ReplacedContentFinal.html);
                setParsedContent(contentMDParsed);
                setParsedJavascript(() => [...ReplacedContent1.js, ...ReplacedContentFinal.js])
            } else {
                // Else not found. found state is false by default
                throw 404;
            }
        })
        .catch((e) => {
            // An error occured
            setErrorMessage(e === 404 ? "Not found." : "Sorry, an unknown server error occured!");
        })
        .finally(() => {
            setIsLoading(false);
        });

        // Destuctor / onUnmount
        return () => {
            init();
        }
    }, [dataAPI]);

    // After content has been parsed
    useEffect(() => {
        // This is executed when the content is parsed
        hljs.highlightAll();
    }, [parsedContent]);

    // Execute javascript of all the carousel
    useEffect(() => {
        // Execute the javascript after 1000ms
        parsedJavascript.forEach((str) => {
            setTimeout(() => {
                eval(str);
            }, 1000);
        })
    }, [parsedJavascript]);

    return (
        <Grid container spacing={2}>
            {
                isLoading ?
                // A skeleton loader
                <>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="rounded" height={100}/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Skeleton variant="rounded" height={100}/>
                    </Grid>
                </>       
                :
                
                // If there is an error, show an error
                error ? 
                <Grid item xs={12}><Error message={errorMessage} /></Grid>
                :
                
                <>
                    {/* Portfolio Navbar */}
                    <Grid item xs={12} md={4} sx={{overflow: "hidden", position: "relative"}}>
                        <ViewPortfolioNavbar/>
                    </Grid>

                    {/* Portfolio content */}
                    <Grid item xs={12} md={8}>
                        <AppCard>
                            <Box sx={{p: 3}}>
                                {/* Header and tags */}
                                <Typography variant="h4" sx={{textDecoration: "underline", mb: 1}}>{data?.name}</Typography>
                                {data?.tags.map((str, i) => <Chip label={str} size="small" color="info" sx={{mr: 1}} key={i}/>) }
                                
                                <Divider sx={{my: 2}}/>

                                {/* Content */}
                                <Typography sx={{
                                    "& img": {
                                        width: "100%",
                                        objectFit: "contain"
                                    }
                                }}>
                                    {parsedContent}
                                </Typography>
                            </Box>
                        </AppCard>
                    </Grid>

                </>

            }
        </Grid>
    )
};

export default ViewPortfolio;