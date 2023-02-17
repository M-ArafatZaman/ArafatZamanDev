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
                <ElementInViewport sx={{height: "100%"}}>
                    <Box display="flex" justifyContent="center" alignItems="center" p={3} height="100%">
                        <img src={AstronautGIF} style={{objectFit: "contain", height: "250px"}} />
                    </Box>
                </ElementInViewport>
            </Grid>

            <Grid item xs={12} md={8}>
                <ElementInViewport>
                    <AppCard>
                        <Box p={2}>
                            {/* The lyrics finder */}
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <MusicNoteIcon fontSize='large'/>
                                <Typography variant="h5" sx={{ml: 1}}>LyricsFinder</Typography>
                            </Box>

                            <Divider sx={{my: 1}}/>
                            <Typography sx={{mb: 1}}>
                                LyricsFinder is an online web application that users can use to search their playlist for songs that match specific lyrics.
                            </Typography>
                            <Typography sx={{mb: 1}}>
                                It utilizes the <LinkIcon href="https://developer.spotify.com/documentation/web-api/" target="_blank" icon={<LaunchIcon fontSize="small"/>}>Spotify Developer's API</LinkIcon> and <LinkIcon href="https://docs.genius.com/" target="_blank" icon={<LaunchIcon fontSize="small" />}>Genius API</LinkIcon> to iteratively search songs for their respective lyrics.
                            </Typography>
                            <Typography sx={{mb: 1}}>
                                Firstly, it uses the Genius API's search endpoint to search for lyrics. It then goes through all the results and ranks them based on how likely it is that the lyrics retrieved is actually the song.
                            </Typography>
                            <Typography>
                                After the lyrics has been retrieved, the server returns the results following REST API protocols. The frontend client uses the results and renders them accordingly.
                            </Typography>
                            <Typography>
                                You can check out the project <LinkIcon href="https://lyrics-finder-02nb.onrender.com/" target="_blank" icon={<LaunchIcon fontSize="small"/>}>here</LinkIcon>.
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