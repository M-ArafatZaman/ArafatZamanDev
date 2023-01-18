import React from 'react';
// @mui components
import {
    Grid, 
    Typography,
    Box,
    Link,
    Button
} from '@mui/material';
// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
// Other components
import AppCard from './components/AppCard';
import RaspberryPI from './raspberry';
// SVGs
import backdropSVG from './media/backdrop.png';

function GridLayer1() {

    return (
        <>
        {/* The software developer container */}
        <Grid item xs={12} sm={6}>
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
                    <Typography variant="h6" sx={{marginBottom: 1}}>I am a software developer</Typography>
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
        </Grid>
        
        {/* RaspberryPI component */}
        <Grid item xs={12} sm={6}>
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