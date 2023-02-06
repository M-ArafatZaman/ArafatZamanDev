import React, {useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// @mui icons
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Endpoints
import {BASE, VIEW_PROJECT_ITEM} from '../ENDPOINT';
// Types
import {ViewProjectAPIResponse} from '../types';
// Other components
import AppCard from '../../home/components/AppCard';
// MD parser and html react parser
import {marked} from 'marked';
import HTMLReactParser from 'html-react-parser';
import hljs from 'highlight.js';

const ViewProject: React.FC = () => {

    const {slug} = useParams<{slug: string}>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [found, setFound] = useState<boolean>(false);
    const [data, setData] = useState<ViewProjectAPIResponse["item"]>();
    const [parsedContent, setParsedContent] = useState<ReturnType<typeof HTMLReactParser>>();
    // Router dom
    const location = useLocation();
    const navigate = useNavigate();

    // Navigate to prev page
    const goBack = () => {
        navigate("/projects/");
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Initialize loading
        setIsLoading(true); 
        setFound(false);

        // Fetch
        fetch(`${BASE}${VIEW_PROJECT_ITEM}${slug}/`, {
            method: "GET",
            mode: "cors",
            signal: signal
        })
        .then((response) => response.json())
        .then((response: ViewProjectAPIResponse) => {
            if (response.status === "OK") {
                setData(response.item);
                setFound(true);
                setParsedContent(HTMLReactParser(marked(response.item.content)));
            }
        })
        .finally(() => {
            setIsLoading(false);
        })

        // Destructor to delete all the items in context
        return () => {
            // Delete all items
            setParsedContent(undefined);
            setData(undefined);
            setFound(false);
            setIsLoading(true);
            // Abort fetch when the component is unmounted
            controller.abort();
        }

    }, [location.pathname]);

    useEffect(() => {
        // Highlight after 1000ms to ensure all code blocks is properly highlighted
        setTimeout(() => {
            hljs.highlightAll();
        }, 500)
    }, [parsedContent]);

    return (
        <>
        <Grid container spacing={2}>
            {
                isLoading ? 
                <Typography>LOADING...</Typography> :
                !found ? 
                <Typography><b>Not found</b></Typography> :

                // Data is found
                <>
                {/* Main content */}
                <Grid item xs={12} md={9}>
                    <AppCard sx={{p: 2}}>
                        {/* Title */}
                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                            <AccountTreeIcon/>
                            <Typography variant="h4" sx={{ml: 1}}>{data?.name}</Typography>
                        </Box>
                        <Divider sx={{my: 1}} />

                        {/* Content */}
                        <Box p={1}>
                            {parsedContent}
                        </Box>

                        <Divider sx={{my: 1}} />
                        <Box>
                            <Button
                                startIcon={<ArrowBackIcon/>}
                                variant="contained"
                                color="error"
                                onClick={goBack}
                            >Go back</Button>
                        </Box>
                    </AppCard>
                </Grid>

                {/* Extra content */}
                <Grid item xs={12} md={3}>
                    <Box sx={{
                        width: "100%",
                        p: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <img src={data?.imageURL} style={{objectFit: "contain", width: "100%", borderRadius: "8px"}} />
                        <Typography sx={{mt: 1, fontSize: 12}} variant="body2" color="GrayText">{data?.short_description}</Typography>
                    </Box>
                </Grid>
                </>
            }
        </Grid>
            
        </>
    )
};

export default ViewProject;