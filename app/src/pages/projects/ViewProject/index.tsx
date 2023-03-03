import React, {useEffect, useState} from 'react';
import {useNavigate, useLoaderData} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
// @mui icons
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Types
import {ViewProjectAPIResponse} from '../types';
// Other components
import AppCard from '../../home/components/AppCard';
import Error from '../../../components/Error';
// MD parser and html react parser
import {marked} from 'marked';
import HTMLReactParser from 'html-react-parser';
import hljs from 'highlight.js';

const ViewProject: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [data, setData] = useState<ViewProjectAPIResponse["item"]>();
    const [parsedContent, setParsedContent] = useState<ReturnType<typeof HTMLReactParser>>();
    const [width, setWidth] = useState<number>(window.innerWidth);
    // Data api from the loader
    const dataAPI = useLoaderData() as {response: Promise<Response>};

    // Clear data whenever the component is mounted or unmounted
    const init = () => {
        setIsLoading(true); setError(false); setErrorMessage("");
        setData(undefined); setParsedContent(undefined);
    }

    // When the component is mounted
    // Attach an eventlistener to update the width whenever the width of the window changes
    // removeEventlistener on component unmount
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", updateWidth);

        // Destructor
        return () => {
            window.removeEventListener("resize", updateWidth);
        }
    }, []);

    // Router dom
    const navigate = useNavigate();

    // Navigate to prev page
    const goBack = () => {
        navigate("/projects/");
    }

    // Use the dataAPI from the loader to update data
    useEffect(() => {
        // Initialize states
        init();

        // Fetch
        dataAPI.response
        .then((response) => response.json())
        .then((response: ViewProjectAPIResponse) => {
            if (response.status === "OK") {
                setData(response.item);
                setError(false); setErrorMessage("");
                setParsedContent(HTMLReactParser(marked(response.item.content)));
            } else {
                // Else, NOT FOUND
                throw 404;
            }
        })
        .catch((e) => {
            // An error occured
            setError(true);
            setErrorMessage(e === 404 ? "Not found." : "Sorry, an unknown error occured.");
        })
        .finally(() => {
            setIsLoading(false);
        })

        // Destructor to delete all the items in context
        return () => init();

    }, [dataAPI]);

    useEffect(() => {
        // Highlight after 1000ms to ensure all code blocks is properly highlighted
        setTimeout(() => {
            hljs.highlightAll();
        }, 500)
    }, [parsedContent]);

    return (
        <>
        <Grid container spacing={2} direction={width <= 900 ? "column-reverse" : "row"}>
            {
                // Show a loader while it is loading
                isLoading ?
                <>
                <Grid item xs={12} md={9}>
                    <Skeleton variant="rounded" height={100} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Skeleton variant="rounded" height={100} />
                </Grid>  
                </> 
                :
                // Else check for errors
                error ? 
                <Grid item xs={12}><Error message={errorMessage} /></Grid>
                :
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
                        <Typography component="div" p={1}>
                            {parsedContent}
                        </Typography>

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
                        <img src={data?.imageURL} style={{objectFit: "contain", width: "100%", maxHeight: "300px", borderRadius: "8px"}} />
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