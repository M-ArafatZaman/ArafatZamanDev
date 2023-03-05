import React from 'react';
import {useLoaderData} from '@remix-run/react';
// @mui components
import Box from '@mui/material/Box';
import List from '@mui/material/List';
// Other components
import AppCard from '../../home/components/AppCard';
import SearchBar from './SearchBar';
import Error from '../../../components/Error';
// Loader and types
import {GetBlogsLoader} from '../loader';
import {GetBlogsAPIResponse} from '../types';
// Blog components
import ListBlogs from './ListBlogs';
// Arafat tag
import ArafatTag from '../components/ArafatTag';
// Blog wrapper
import Blog from '../index';

const BlogItems: React.FC = () => {

    const $data: GetBlogsAPIResponse = useLoaderData<typeof GetBlogsLoader>();

    return (
        <Blog>
            <Box>
                <AppCard sx={{p: 2}}>
                    <>
                    {/* Arafat tag */}
                    <ArafatTag/>

                    {/* Blog lists */}
                    {   
                        // Check if any error occured
                        $data.status !== "OK" ?
                        <Box p={2}>
                            <Error message="Sorry! An unknown error occured." />
                        </Box>
                        :
                        // Else everything is OK
                        <>
                        {/* Search bar */}
                        <SearchBar/>

                        {/* List of blogs */}
                        <List sx={{border: "1px solid rgba(0,0,0,.15)", padding: 0}}>
                            {$data.response.map((elem, i) => (
                                <ListBlogs
                                    key={i}
                                    name={elem.name}
                                    date_created={elem.date_created}
                                    slug={elem.slug}
                                    read_time={elem.read_time}
                                    tags={elem.tags}
                                    isLast={i === $data.response.length - 1}
                                />
                            ))}
                        </List>
                        </>
                    }
                    </>
                </AppCard>
            </Box>
        </Blog>
    )
};

export default BlogItems;