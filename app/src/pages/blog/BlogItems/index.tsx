import React, {useContext} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
// Other components
import AppCard from '../../home/components/AppCard';
import SearchBar from './SearchBar';
import Error from '../../../components/Error';
// Context
import {BlogsContext} from '../reducer';
// Blog components
import ListBlogs from './ListBlogs';
// Arafat tag
import ArafatTag from '../components/ArafatTag';

const BlogItems: React.FC = () => {

    const BContext = useContext(BlogsContext);

    return (
        <Box>
            <AppCard sx={{p: 2}}>
                <>
                {/* Arafat tag */}
                <ArafatTag/>

                {/* Blog lists */}
                {   
                    // While it is loading, show a loader
                    BContext.isLoading ?
                    [1,2,3].map((i) => (
                        <Box p={2} key={i}>
                            <Skeleton variant="rounded" height={100} />
                        </Box>
                    ))
                    :
                    // Check if any error occured
                    BContext.error ?
                    <Box p={2}>
                        <Error message={BContext.errorMessage} />
                    </Box>
                    :
                    // Else everything is OK
                    <>
                    {/* Search bar */}
                    <SearchBar/>

                    {/* List of blogs */}
                    <List sx={{border: "1px solid rgba(0,0,0,.15)", padding: 0}}>
                        {BContext.items.map((elem, i) => (
                            <ListBlogs
                                key={i}
                                name={elem.name}
                                date_created={elem.date_created}
                                slug={elem.slug}
                                read_time={elem.read_time}
                                tags={elem.tags}
                                isLast={i === BContext.items.length - 1}
                            />
                        ))}
                    </List>
                    </>
                }
                </>
            </AppCard>
        </Box>
    )
};

export default BlogItems;