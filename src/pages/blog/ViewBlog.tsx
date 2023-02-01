import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// @mui icons
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ClockIcon from '@mui/icons-material/WatchLater';
// App card
import AppCard from '../home/components/AppCard';
// Endpoints and types
import {BASE, READ_BLOG} from './ENDPOINT';
import {ReadBlogsAPIResponse, BlogItem} from './types';
// Parser and highlighter
import hljs from 'highlight.js';
import HTMLReactParser from 'html-react-parser';


const ViewBlog: React.FC = () => {
    const {slug} = useParams<{slug: string;}>();
    const [data, setData] = useState<BlogItem>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [found, setFound] = useState<boolean>(false);
    const [parsedContent, setParsedContent] = useState<JSX.Element | JSX.Element[] | string>();

    // Fetch data
    useEffect(() => {
        setIsLoading(true);
        // Fetch data
        fetch(`${BASE}${READ_BLOG}${slug}/`, {
            method: "GET",
            mode: "cors"
        })
        .then((resp) => resp.json())
        .then((resp: ReadBlogsAPIResponse) => {
            console.log(resp);
            if (resp.status === "OK" && typeof resp.payload !== "undefined") {
                console.log(resp);
                setData(resp.payload);
                setFound(true);
                setParsedContent(HTMLReactParser(resp.payload.content));
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, []);

    // Highlight once parsed content is loading
    useEffect(() => {
        hljs.highlightAll();
    }, [parsedContent])

    return (
        <Box>
            <AppCard sx={{p: 2}}>
                {
                    isLoading ? <Typography>LOADING...</Typography> :
                    
                    !found ? <Typography>Not found</Typography> :
                    
                    <>
                        <Typography variant="h4" textAlign="center"><u>{data?.name}</u></Typography>
                        {/* Date and read time */}
                        <Typography variant="caption" color="GrayText" sx={{display: "flex", flexDirection: "row", alignItems: "center", fontWeight: "600"}}>
                            <CalendarIcon/>
                            <Typography variant="inherit">&nbsp;{data?.date_created} |&nbsp;</Typography>
                            <ClockIcon/>
                            <Typography variant="inherit">&nbsp;{data?.read_time} min read</Typography>
                        </Typography>
                        <Divider sx={{my: 1}}  />

                        {/* Content */}
                        <Box>

                        </Box>
                    </>
                }
            </AppCard>
        </Box>
    )
};

export default ViewBlog;