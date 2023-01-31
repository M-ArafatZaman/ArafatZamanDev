import React, {useContext} from 'react';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// @mui icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
// Other components
import AppCard from '../home/components/AppCard';
// Context
import {BlogsContext} from './blogContext';
// Photos
import MugshotJPG from '../../media/photos/mugshot.jpg';

const BlogItems: React.FC = () => {

    const BContext = useContext(BlogsContext);

    return (
        <Box>
            <AppCard sx={{p: 2}}>
                <>
                {/* Arafat tag */}
                <Box display="flex" flexDirection="row" p={3} sx={{borderBottom: "1px solid rgba(0,0,0,.15)"}}>
                    <Avatar alt="Arafat" src={MugshotJPG} sx={{height: 150, width: 150}} />
                    <Box px={3}>
                        <Typography variant="h5"><b><u>Mohammad Arafat Zaman</u></b></Typography>
                        <Typography sx={{my: 1}}><i>"Technophile"</i></Typography>
                        {/* Social Icons */}
                        <Box display="flex" flexDirection="row">
                            <IconButton sx={{color: "#0072b1"}} size="large"><LinkedInIcon/></IconButton>
                            <IconButton sx={{color: "#d62976"}} size="large"><InstagramIcon/></IconButton>
                            <IconButton sx={{color: "#3b5998"}} size="large"><FacebookIcon/></IconButton>
                            <IconButton sx={{color: "#00acee"}} size="large"><TwitterIcon/></IconButton>
                            <IconButton sx={{color: "#171515"}} size="large"><GitHubIcon/></IconButton>
                        </Box>
                    </Box>
                </Box>

                {/* Blog lists */}
                {
                    BContext.isLoading ?
                    <Typography>Loading</Typography>
                    :
                    BContext.items.map((elem, i) => (
                        <Typography key={i}>{elem.name}</Typography>
                    ))
                }
                </>
            </AppCard>
        </Box>
    )
};

export default BlogItems;