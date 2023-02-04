import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
// Endpoints and types
import {BASE, READ_BLOG} from '../ENDPOINT';
import {ReadBlogsAPIResponse, BlogItem} from '../types';
// MD parser, HTML Parser and highlighter
import {marked} from 'marked';
import hljs from 'highlight.js';
import HTMLReactParser from 'html-react-parser';
import ImageExtension from './MDImageRenderer';

// Add a custom image renderer for the marked parser
marked.use(ImageExtension);

const ViewBlog: React.FC = () => {
    const {slug} = useParams<{slug: string;}>();
    const [data, setData] = useState<BlogItem>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [found, setFound] = useState<boolean>(false);
    const [parsedContent, setParsedContent] = useState<JSX.Element | JSX.Element[] | string>();
    // Navigator
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch data whenever the location changes
    useEffect(() => {
        setIsLoading(true);
        // Fetch data
        fetch(`${BASE}${READ_BLOG}${slug}/`, {
            method: "GET",
            mode: "cors"
        })
        .then((resp) => resp.json())
        .then((resp: ReadBlogsAPIResponse) => {
            if (resp.status === "OK" && typeof resp.payload !== "undefined") {
                setData(resp.payload);
                setFound(true);
                setParsedContent(HTMLReactParser(marked.parse(resp.payload.content)));
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [location.pathname]);

    // Highlight once parsed content is loading
    useEffect(() => {
        hljs.highlightAll();
    }, [parsedContent])

    return (
        <Box>
            <AppCard sx={{p: 3}}>
                {
                    isLoading ? <Typography>LOADING...</Typography> :
                    
                    !found ? <Typography>Not found</Typography> :
                    
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