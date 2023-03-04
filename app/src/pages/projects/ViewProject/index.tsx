import React, {useEffect, useState} from 'react';
import {useNavigate, useLoaderData} from '@remix-run/react';
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
// Types and loader
import {ViewProjectAPIResponse} from '../types';
import {ViewProjectLoader} from '../loader';
// Other components
import AppCard from '../../home/components/AppCard';
import Error from '../../../components/Error';
// MD parser and html react parser
import {marked} from 'marked';
import HTMLReactParser from 'html-react-parser';
import hljs from 'highlight.js';
// Projects wrapper
import Projects from '../index';


const ViewProject: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    // Hydration check
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const [parsedContent, setParsedContent] = useState<ReturnType<typeof HTMLReactParser>>();
    const [width, setWidth] = useState<number>(0);
    // Data api from the loader
    const $data: ViewProjectAPIResponse = useLoaderData<typeof ViewProjectLoader>();

    // When the component is mounted
    // Attach an eventlistener to update the width whenever the width of the window changes
    // removeEventlistener on component unmount
    useEffect(() => {
        if (isHydrated) {
            const updateWidth = () => {
                setWidth(window.innerWidth);
            };
            window.addEventListener("resize", updateWidth);
            updateWidth();
    
            // Destructor
            return () => {
                window.removeEventListener("resize", updateWidth);
            }
        }
    }, [isHydrated]);

    // Router dom
    const navigate = useNavigate();

    // Navigate to prev page
    const goBack = () => {
        navigate("/projects/");
    }

    // After hydration, use data from the loader to update parsed data
    useEffect(() => {
        if (isHydrated && $data.status === "OK") {
            setParsedContent(HTMLReactParser(marked($data.item.content)));
        }
    }, [isHydrated]);

    useEffect(() => {
        // Highlight after 1000ms to ensure all code blocks is properly highlighted
        hljs.highlightAll();
    }, [parsedContent]);

    return (
        <Projects>
            <Grid container spacing={2} direction={width <= 900 ? "column-reverse" : "row"}>
                {
                    !isHydrated ? 
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
                    $data.status === "Error" ? 
                    <Grid item xs={12}><Error message="Sorry, an unknown server error occured!" /></Grid>
                    :
                    // If there is no server error, but the status is not ok, then nothing is found
                    $data.status !== "OK" ?
                    <Grid item xs={12}><Error message="Not found." /></Grid>
                    :
                    // Data is found
                    <>
                    {/* Main content */}
                    <Grid item xs={12} md={9}>
                        <AppCard sx={{p: 2}}>
                            {/* Title */}
                            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                <AccountTreeIcon/>
                                <Typography variant="h4" sx={{ml: 1}}>{$data.item.name}</Typography>
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
                            <img src={$data.item.imageURL} style={{objectFit: "contain", width: "100%", maxHeight: "300px", borderRadius: "8px"}} />
                            <Typography sx={{mt: 1, fontSize: 12}} variant="body2" color="GrayText">{$data.item.short_description}</Typography>
                        </Box>
                    </Grid>
                    </>
                }
            </Grid>
        </Projects>
    )
};

export default ViewProject;