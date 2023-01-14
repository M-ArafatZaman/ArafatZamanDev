import React from 'react';
// @mui components
import {
    Box,
    Typography,
    Container,
    Grid,
    Button,
    Link
} from '@mui/material';
// App theme
import {APP_THEME} from '../../appTheme';
// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import GithubIcon from '@mui/icons-material/GitHub';
// RaspberryPI component
import RaspberryPI from './raspberry';

const backdrop_VEC = require("./media/backdrop.png") as string;

const Home: React.FC = () => {

    return (
        <Container>

            <Grid container spacing={2} sx={{marginY: 0}}>

                {/* The software developer container */}
                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: APP_THEME.shadows[3],
                        padding: 4,
                        paddingY: 8,
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        {/* The backdrop */}
                        <img 
                            src={backdrop_VEC} 
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
                            <Button variant="contained" color="primary" sx={{fontWeight: "bold"}} startIcon={<DescriptionIcon/>}>
                                Download Resume
                            </Button>
                            <br/>
                            <Button variant="contained" color="inherit" sx={{fontWeight: "bold", mt: 1}} startIcon={<GithubIcon/>}
                                href="https://github.com/M-ArafatZaman" target="_blank"
                            >
                                Github
                            </Button>
                        </Box>
                    </Box>
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
            </Grid>

        </Container>
    )
};

export default Home;