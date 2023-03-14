import React, {useEffect} from 'react';
import {useNavigate, useLoaderData} from '@remix-run/react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
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
import HTMLReactParser from 'html-react-parser';
import hljs from 'highlight.js';
// Projects wrapper
import Projects from '../index';
import {useWidth} from '../../../utils';


const ViewProject: React.FC = () => {
    const width = useWidth();
    const APP_THEME = useTheme();
    // Data api from the loader
    const $data: ViewProjectAPIResponse = useLoaderData<typeof ViewProjectLoader>();

    // Router dom
    const navigate = useNavigate();

    // Navigate to prev page
    const goBack = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate("/projects/");
    }

    useEffect(() => {
        // Highlight after 1000ms to ensure all code blocks is properly highlighted
        hljs.highlightAll();
    }, [$data]);

    return (
        <Projects>
            <Grid container spacing={2}>
                {
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
                    {/* Extra content */}
                    <Grid item xs={12} md={3}>
                        <Box sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            "& > img": {
                                objectFit: "contain",
                                maxWidth: "100%",
                                maxHeight: "300px",
                                borderRadius: "8px"
                            }
                        }}>
                            <img src={$data.item.imageURL} />
                            <Typography sx={{mt: 1, fontSize: 12}} variant="body2" color="GrayText">
                                {$data.item.short_description}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Main content */}
                    <Grid item xs={12} md={9}>
                        <AppCard>
                            <Box py={3} px={width >= APP_THEME.breakpoints.values["md"] ? 2 : 1}>
                                {/* Title */}useState
                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                    <AccountTreeIcon/>
                                    <Typography variant="h4" sx={{ml: 1}}>{$data.item.name}</Typography>
                                </Box>
                                <Divider sx={{my: 1}} />

                                {/* Content */}
                                <Typography component="div" p={1}>
                                    {HTMLReactParser($data.item.md)}
                                </Typography>

                                <Divider sx={{my: 1}} />
                                <Box>
                                    <Button
                                        startIcon={<ArrowBackIcon/>}
                                        variant="contained"
                                        color="error"
                                        onClick={goBack}
                                        href="/projects/"
                                    >Go back</Button>
                                </Box>
                            </Box>
                        </AppCard>
                    </Grid>

                    </>
                }
            </Grid>
        </Projects>
    )
};

export default ViewProject;