import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// Marked, highlight js, and html react parser
import {marked} from 'marked';
import hljs from "highlight.js";
import htmlReactParser from 'html-react-parser';
// Other components
import AppCard from '../home/components/AppCard';
// Types
import {ViewPortfolioItemAPIResponse, PortfolioItem} from './types';
import {BASE, VIEW_PORTFOLIO_ITEMS} from './ENDPOINT';
// Carousel component
import {replaceContentWithCarousel} from '../../components/Carousel';
// App theme
import {APP_THEME} from '../../appTheme';

/* 
The view portfolio page component that retrieves a single portfolio item 
from the server and renders it.
It is a page component. It receives the slug parameter from the browserrouter API.
*/
const ViewPortfolio: React.FC = () => {
    const params = useParams<{slug: string}>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PortfolioItem>();
    const [found, setFound] = useState<boolean>(false);
    const [parsedContent, setParsedContent] = useState<JSX.Element | JSX.Element[] | string>();
    const [parsedJavascript, setParsedJavascript] = useState<string[]>([]);

    useEffect(() => {
        fetch(`${BASE}${VIEW_PORTFOLIO_ITEMS}${params.slug}`, {
            method: "GET",
            mode: "cors"
        })
        .then((response) => response.json())
        .then((response: ViewPortfolioItemAPIResponse) => {
            if (response.status == "OK") {
                // Found item
                setData(response.payload);
                setFound(true);
                // Parse content and replace with carousel
                const contentMD = marked.parse(response.payload.content);
                const ReplacedContent = replaceContentWithCarousel(contentMD);
                // Replace with carousel
                const contentMDParsed = htmlReactParser(ReplacedContent.html);
                setParsedContent(contentMDParsed);
                setParsedJavascript(() => [...ReplacedContent.js])
            }
            // Else not found. found state is false by default
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

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
        <Container sx={{p: 2}}>
            <Grid container spacing={2}>
                {
                    isLoading ? <Typography>LOADING...</Typography> :

                    !found ? <Typography>NOT FOUND</Typography> :
                    
                    /* Main portfolio */
                    <>
                        <Grid item xs={12} md={4}>
                            <AppCard sx={{backgroundColor: APP_THEME.palette.primary.main}}>
                                <Box p={2}>
                                    <Typography variant="h6">Contents</Typography>
                                    <Divider sx={{my: 1}}/>
                                    <Button fullWidth variant="contained" sx={{backgroundColor: "rgba(255,255,255,0.4)"}}>LyricsFinder</Button>
                                </Box>
                            </AppCard>
                        </Grid>

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
        </Container>
    )
};

export default ViewPortfolio;