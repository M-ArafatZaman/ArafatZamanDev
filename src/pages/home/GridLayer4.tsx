import React from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// Components
import AppCard from './components/AppCard';
// Import gif
//import MobileDeviceGIF from '../../media/gif/mobile_device.gif';
// @mui icons
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LaunchIcon from '@mui/icons-material/Launch';
// Utils
import {ElementInViewport, LinkIcon} from '../../utils';

const GridLayer4: React.FC = () => {

    return (
        <>
        <Grid item xs={12} sm={8}>
            <ElementInViewport animation="fadeInLeft" delay={500}>
                <AppCard>
                    <Box p={2}>
                        {/* The lyrics finder */}
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <PhoneIphoneIcon fontSize='large'/>
                            <Typography variant="h5" sx={{ml: 1}}>InPeril</Typography>
                        </Box>

                        <Divider sx={{my: 1}}/>
                        <Typography sx={{mb: 1}}>
                            InPeril is a mobile application which helps to track users when they are in danger and relays their live-location to their emergency contact(s).
                        </Typography>
                        <Typography sx={{mb: 1}}>
                            It is made using React-Native, nativebase (design library), Redux, Firebase and more React Native libraries.
                        </Typography>
                        <Typography sx={{mb: 1}}>
                            This was my first <b>fully-fledged</b> React-Native project that utilizes core ReactNative features for implementing mobile rich features and application.
                        </Typography>
                        <Typography sx={{mb: 1}}>
                            You can download it on Android <LinkIcon href="https://play.google.com/store/apps/details?id=com.inperil" target="_blank" icon={<LaunchIcon fontSize="small"/>}>here</LinkIcon>.
                        </Typography>
                    </Box>
                </AppCard>
            </ElementInViewport>
        </Grid>

        <Grid item xs={12} sm={4}>
            <ElementInViewport animation="fadeInRight" delay={500} sx={{height: "100%"}}>
                <Box display="flex" justifyContent="center" alignItems="center" p={3} height="100%">
                    {/* <img src={MobileDeviceGIF} style={{objectFit: "contain", height: "250px"}}/> */}
                    [Image]
                </Box>
            </ElementInViewport>
        </Grid>
        </>
    )
};

export default GridLayer4;