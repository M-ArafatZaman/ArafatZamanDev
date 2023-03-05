import React, {useEffect, useState} from 'react';
import { useNavigate, useLoaderData } from '@remix-run/react';
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
// Types and laoders
import {ReadBlogLoader} from '../loader';
import {ReadBlogsAPIResponse} from '../types';
// MD parser, HTML Parser and highlighter
import {marked} from 'marked';
import hljs from 'highlight.js';
import HTMLReactParser from 'html-react-parser';
import ImageExtension from './MDImageRenderer';
// Blog wrapper
import Blog from '../index';

// Add a custom image renderer for the marked parser
marked.use(ImageExtension);

const ViewBlog: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    // Hydration check
    useEffect(() => {
        setIsHydrated(true);
    }, [])

    const [parsedContent, setParsedContent] = useState<JSX.Element | JSX.Element[] | string>();
    // DataAPI from the loader
    const $data: ReadBlogsAPIResponse = useLoaderData<typeof ReadBlogLoader>();
    // Navigator
    const navigate = useNavigate();

    // After hydration
    useEffect(() => {
        if (isHydrated && $data.status === "OK" && typeof $data.payload !== "undefined") {
            setParsedContent(HTMLReactParser(marked.parse($data.payload.content)));
        }
    }, [isHydrated]);

    // Highlight once parsed content is loading
    useEffect(() => {
        hljs.highlightAll();
    }, [parsedContent])

    return (
        <Blog>
            <Box>
                <AppCard sx={{p: 3}}>
                    {
                        // If it is still loading
                        !isHydrated ? <SkeletonLoader/> :
                        
                        // Else check for erros
                        $data.status === "Error" ?
                        <Error message="Sorry, an unknown server error occured!" />
                        :
                        // If there is no server error, but the status is not ok
                        // Did not find any blog
                        $data.status !== "OK" ?
                        <Error message="Not found." />
                        :
                        // All data is sccurate
                        <>
                            <Typography variant="h4" textAlign="center"><u>{$data.payload?.name}</u></Typography>
                            {/* Date and read time */}
                            <Typography variant="caption" color="GrayText" sx={{display: "flex", flexDirection: "row", alignItems: "center", fontWeight: "600", py: 1}}>
                                <CalendarIcon/>
                                <Typography variant="inherit">&nbsp;{$data.payload?.date_created} |&nbsp;</Typography>
                                <ClockIcon/>
                                <Typography variant="inherit">&nbsp;{$data.payload?.read_time} min read</Typography>
                            </Typography>

                            {/* Tags */}
                            <Box display="flex" flexDirection="row" py={1} flexWrap="wrap">
                                {$data.payload?.tags.map((elem, i) => <Chip label={elem} key={i} size="small" sx={{m: .5, ml: 0}} />)}
                            </Box>
                            <Divider sx={{my: 1}}  />

                            {/* Content */}
                            <Typography component="div" sx={{
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
                {
                    $data.payload && <Suggestions suggestions={$data.payload?.suggestions} />
                }
            </Box>
        </Blog>
    )
};

export default ViewBlog;