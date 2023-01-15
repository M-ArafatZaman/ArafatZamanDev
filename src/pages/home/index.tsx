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
// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import GithubIcon from '@mui/icons-material/GitHub';
// RaspberryPI component
import RaspberryPI from './raspberry';
// Import svgs
import blogSVG from '../media/blog.svg';
import portfolioSVG from '../media/portfolio.svg';
import projectSVG from '../media/projects.svg';
import backdropSVG from './media/backdrop.png';
// Other components
import AppCard from './components/AppCard';
import FeatureCard from './components/FeatureCard';

const Home: React.FC = () => {

    return (
        <Container>

            {/* The first grid with greetings and raspberry container */}
            <Grid container spacing={2} sx={{marginY: 0}}>
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
            </Grid>

            {/* The second container containing portfolio, projects, blogs */}
            <Grid container paddingY={2} spacing={2}>
                {/* Portfolio */}
                <Grid item xs={12} sm={4}>
                    <FeatureCard image={portfolioSVG}>
                        <Typography variant="h6"><b>Portfolio</b></Typography>
                        <Typography>Explore my portfolio and discover my past projects and experiences.</Typography>
                        <Button>visit</Button>
                    </FeatureCard>
                </Grid>

                {/* Projects */}
                <Grid item xs={12} sm={4}>
                    <FeatureCard image={projectSVG}>
                        <Typography variant="h6"><b>Projects</b></Typography>
                    </FeatureCard>
                </Grid>

                {/* Blogs */}
                <Grid item xs={12} sm={4}>
                    <FeatureCard image={blogSVG}>
                        <Typography variant="h6"><b>Blogs</b></Typography>
                    </FeatureCard>
                </Grid>
            </Grid>

        </Container>
    )
};

export default Home;