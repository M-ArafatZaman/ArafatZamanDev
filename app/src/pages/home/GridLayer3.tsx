import React from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// Components
import AppCard from './components/AppCard';
// Gif
import AstronautGIF from '../../media/gif/astronaut.gif';
// @mui icons
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LaunchIcon from '@mui/icons-material/Launch';
// Utils
import {ElementInViewport, LinkIcon} from '../../utils';

const GridLayer3: React.FC = () => {

    return (
        <>
        <Grid container spacing={2} paddingY={2}>

            <Grid item xs={12} md={4}>
                <ElementInViewport sx={{height: "100%"}} animation="fadeInLeft">
                    <Box display="flex" justifyContent="center" alignItems="center" p={3} height="100%">
                        <img src={AstronautGIF} style={{objectFit: "contain", height: "250px"}} />
                    </Box>
                </ElementInViewport>
            </Grid>

            <Grid item xs={12} md={8}>
                <ElementInViewport animation="fadeInRight">
                    <AppCard>
                        <Box p={2}>
                            {/* The lyrics finder */}
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <MusicNoteIcon fontSize='large'/>
                                <Typography variant="h5" sx={{ml: 1}}>LyricsFinder</Typography>
                            </Box>

                            <Divider sx={{my: 1}}/>

                            <Typography>
                                LyricsFinder is a web application that I created to empower users to search their playlists for specific song lyrics with ease and precision.
                                <br/><br/>
                                Built on a foundation of cutting-edge technology, LyricsFinder leverages the <LinkIcon href="https://developer.spotify.com/documentation/web-api/" target="_blank" icon={<LaunchIcon fontSize="small"/>}>Spotify Developer's API</LinkIcon> and <LinkIcon href="https://docs.genius.com/" target="_blank" icon={<LaunchIcon fontSize="small" />}>Genius API</LinkIcon> to iteratively search songs for their respective lyrics, providing users with accurate and relevant results.
                                <br/><br/>
                                Through a meticulously designed workflow, LyricsFinder utilizes the Genius API's search endpoint to search for lyrics and then ranks the results based on their likelihood of being a match for the requested song. The server then returns the results in accordance with REST API protocols, which are used by the frontend client to render the results in a visually appealing and intuitive manner.
                                <br/><br/>
                                LyricsFinder is a testament to my passion for leveraging the latest technology to build innovative and user-centric web applications. I invite you to explore the project <LinkIcon href="https://lyrics-finder-02nb.onrender.com/" target="_blank" icon={<LaunchIcon fontSize="small"/>}>here</LinkIcon> and see for yourself how it can enhance your music listening experience.
                            </Typography>
                        </Box>
                    </AppCard>
                </ElementInViewport>
            </Grid>
        </Grid>
        </>
    )
};

export default GridLayer3;