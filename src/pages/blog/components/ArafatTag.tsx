import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// @mui icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
// Mugshot jpg
import MugshotJPG from '../../../media/photos/mugshot.jpg';


/* Arafat Tag */
const ArafatTag: React.FC = () => {

    return (
        <Box display="flex" flexDirection="row" p={3}>
            <Avatar alt="Arafat" src={MugshotJPG} sx={{height: 150, width: 150}} />
            <Box px={3}>
                <Typography variant="h5"><b><u>Mohammad Arafat Zaman</u></b></Typography>
                <Typography sx={{mt: 1}}><i>"Technophile"</i></Typography>
                {/* Social Icons */}
                <Box display="flex" flexDirection="row">
                    <IconButton sx={{color: "#0072b1"}} href="https://www.linkedin.com/in/m-arafatzaman/" target="_blank"><LinkedInIcon/></IconButton>
                    <IconButton sx={{color: "#d62976"}} href="https://www.instagram.com/mohammadarafatzaman/" target="_blank"><InstagramIcon/></IconButton>
                    <IconButton sx={{color: "#3b5998"}} href="https://www.facebook.com/mdarafatzaman01/" target="_blank"><FacebookIcon/></IconButton>
                    <IconButton sx={{color: "#00acee"}} href="https://twitter.com/mdarafatzaman11" target="_blank"><TwitterIcon/></IconButton>
                    <IconButton sx={{color: "#171515"}} href="https://github.com/M-ArafatZaman" target="_blank"><GitHubIcon/></IconButton>
                </Box>
            </Box>
        </Box>
    )
};

export default ArafatTag;