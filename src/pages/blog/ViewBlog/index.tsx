import React, {useEffect, useState} from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
// @mui icons
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ClockIcon from '@mui/icons-material/WatchLater';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Other components
import AppCard from '../../home/components/AppCard';
import ArafatTag from '../components/ArafatTag';
import Suggestions from './Suggestions';
import Error from '../../../components/Error';
import SkeletonLoader from './SkeletonLoader';
import {ReadBlogsAPIResponse, BlogItem} from '../types';
// MD parser, HTML Parser and highlighter
import {marked} from 'marked';
import hljs from 'highlight.js';
import HTMLReactParser from 'html-react-parser';
import ImageExtension from './MDImageRenderer';

// Add a custom image renderer for the marked parser
marked.use(ImageExtension);

const ViewBlog: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [data, setData] = useState<BlogItem>();
    const [parsedContent, setParsedContent] = useState<JSX.Element | JSX.Element[] | string>();
    // DataAPI from the loader
    const dataAPI = useLoaderData() as {response: Promise<Response>};
    // Navigator
    const navigate = useNavigate();

    // Clear state data
    const clearStates = () => {
        setIsLoading(true); setError(false); setErrorMessage("");
        setData(undefined); setParsedContent(undefined);  
    };

    // Fetch data whenever the location changes
    useEffect(() => {
        // Initialize states
        clearStates();

        // Fetch data
        dataAPI.response
        .then((resp) => resp.json())
        .then((resp: ReadBlogsAPIResponse) => {
            if (resp.status === "OK" && typeof resp.payload !== "undefined") {
                setData(resp.payload);
                setError(false);
                setParsedContent(HTMLReactParser(marked.parse(resp.payload.content)));
            } else {
                // Else an error occured
                throw 404;
            }
            
        })
        .catch((e) => {
            // Set errors
            setError(true);
            setErrorMessage(e === 404 ? "Not found." : "Sorry, an unknown error occured.")
        })
        .finally(() => {
            setIsLoading(false);
        });

        // Destructor / on unmount
        return () => clearStates();
    }, [dataAPI]);

    // Highlight once parsed content is loading
    useEffect(() => {
        hljs.highlightAll();
    }, [parsedContent])

    return (
        <Box>
            <AppCard sx={{p: 3}}>
                {
                    // If it is still loading
                    isLoading ? <SkeletonLoader/> :
                    
                    // Else check for erros
                    error ?
                    <Error message={errorMessage} />
                    :
                    // All data is sccurate
                    <>
                        <Typography variant="h4" textAlign="center"><u>{data?.name}</u></Typography>
                        {/* Date and read time */}
                        <Typography variant="caption" color="GrayText" sx={{display: "flex", flexDirection: "row", alignItems: "center", fontWeight: "600", py: 1}}>
                            <CalendarIcon/>
                            <Typography variant="inherit">&nbsp;{data?.date_created} |&nbsp;</Typography>
                            <ClockIcon/>
                            <Typography variant="inherit">&nbsp;{data?.read_time} min read</Typography>
                        </Typography>

                        {/* Tags */}
                        <Box display="flex" flexDirection="row" py={1} flexWrap="wrap">
                            {data?.tags.map((elem, i) => <Chip label={elem} key={i} size="small" sx={{m: .5, ml: 0}} />)}
                        </Box>
                        <Divider sx={{my: 1}}  />

                        {/* Content */}
                        <Typography sx={{
                            "& img": {
                                maxHeight: "70vh",
                                maxWidth: "100%",
                                objectFit: "contain"
                            }
                        }}>
                            {parsedContent}
                        </Typography>

                        {/* Tag */}
                        <Divider sx={{my: 1}} />
                        <ArafatTag/>
                        <Divider sx={{my: 1}} />

                        {/* Facebook plugins */}
                        <Box>

                            <div className="fb-like" data-href={window.location.href} data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                            <div className="fb-comments" data-href={window.location.href} data-width="100%" data-numposts="5"></div>
                        </Box>

                        <Divider sx={{my: 1}} />
                        <Button variant="contained" startIcon={<ArrowBackIcon/>} color="error" onClick={() => {navigate("/blog/")}}>Go back</Button>
                    </>
                }
            </AppCard>

            {/* Suggestions */}
            <Suggestions/>
        </Box>
    )
};

export default ViewBlog;