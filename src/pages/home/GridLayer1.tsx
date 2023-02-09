import React from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
// Other components
import AppCard from './components/AppCard';
import RaspberryPI from './raspberry';
import TypewriterGreetings from './components/TypewriterGreetings';
// SVGs
import backdropSVG from './media/backdrop.png';
// Util components
import {ElementInViewport} from '../../utils';

const GridLayer1: React.FC = () => {

    return (
        <>
        {/* The software developer container */}
        <Grid item xs={12} md={6}>
            {/* Wrap the appcard so that it fadesin from left */}
            <ElementInViewport animation='fadeInLeft' delay={500}>
                <AppCard sx={{
                    padding: 4,
                    paddingY: 8
                }}>
                    {/* The backdrop */}
                    <img 
                        src={backdropSVG} 
                        style={{
                            objectFit: "contain",
                            width: "100%",
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            zIndex: 0
                        }}
                    />
                    
                    {/* Content */}
                    <Box sx={{
                        backgroundColor: "rgba(0,0,0,0)",
                        zIndex: 1,
                        position: "relative"
                    }}>
                        <Typography variant="h5" sx={{fontWeight: "bold"}}>Hi! I am Arafat</Typography>
                        <Box mb={1}>
                            <TypewriterGreetings/>
                        </Box>
                        <Button variant="contained" color="primary" sx={{fontWeight: "bold"}} startIcon={<DescriptionIcon/>} download={true} href="resume.pdf">
                            Download Resume
                        </Button>
                        <br/>
                        <Button variant="contained" color="inherit" sx={{fontWeight: "bold", mt: 1}} startIcon={<GitHubIcon/>}
                            href="https://github.com/M-ArafatZaman" target="_blank"
                        >
                            Github
                        </Button>
                    </Box>
                </AppCard>
            </ElementInViewport>
        </Grid>
        
        {/* RaspberryPI component */}
        <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" sx={{height: "100%", width: "100%"}}>  
                <Box flexGrow={1}>
                    <RaspberryPI/>
                </Box>
                
                {/* Raspberry PI tag */}
                <Box width="100%" display="flex" justifyContent="center">
                    <Typography variant="caption" color="GrayText"><Link href="https://skfb.ly/oBs8I" target="_blank" sx={{
                        color: "inherit",
                        textDecorationColor: "inherit"
                    }}>"Raspberry Pi"</Link> by Aleksander Buzlaev</Typography>
                </Box>
            </Box>
        </Grid>
        </>
    )
};

export default GridLayer1;