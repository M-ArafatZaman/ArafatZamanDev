import React, {useContext} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import InputBase from '@mui/material/InputBase';
// @mui icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
// Other components
import AppCard from '../home/components/AppCard';
import SearchBar from './components/SearchBar';
// Context
import {BlogsContext} from './blogContext';
// Photos
import MugshotJPG from '../../media/photos/mugshot.jpg';
// Blog components
import ListBlogs from './components/ListBlogs';
// Arafat tag
import ArafatTag from './components/ArafatTag';

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
                    BContext.isLoading ?
                    <Typography>Loading</Typography>
                    :
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