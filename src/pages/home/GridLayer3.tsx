import React from 'react';
// @mui components
import {
    Grid,
    Typography,
    Box,
    Divider,
    Link
} from '@mui/material';
// Components
import AppCard from './components/AppCard';
// Lottie player and the lottie animation
import {Player} from '@lottiefiles/react-lottie-player';
import AstronautJSON from '../../media/lottie/astronaut.json';
// @mui icons
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LaunchIcon from '@mui/icons-material/Launch';
// Utils
import {ElementInViewport, LinkIcon} from '../../utils';

const GridLayer3: React.FC = () => {

    return (
        <>
        <Grid item xs={12} sm={4}>
            <ElementInViewport animation="fadeInLeft" delay={500}>
                <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                    <Player
                        loop
                        autoplay
                        src={AstronautJSON}
                        style={{height: 250}}
                    />
                </Box>
            </ElementInViewport>
        </Grid>

        <Grid item xs={12} sm={8}>
            <ElementInViewport animation="fadeInRight" delay={500}>
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
        </>
    )
};

export default GridLayer3;