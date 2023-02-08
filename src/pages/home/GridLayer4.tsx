import React, {useState, useEffect} from 'react';
// @mui components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// Components
import AppCard from './components/AppCard';
// Import gif
import MobileDeviceGIF from '../../media/gif/mobile_device.gif';
// @mui icons
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LaunchIcon from '@mui/icons-material/Launch';
// Utils and APP_THEME
import {ElementInViewport, LinkIcon} from '../../utils';
import {APP_THEME} from '../../appTheme';


const GridLayer4: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    // On mount, add event listener
    // On unmount, remove that event listener to update the state
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", updateWidth);

        // Destructor
        return () => {
            window.removeEventListener("resize", updateWidth);
        }
    }, []);

    return (
        <>
        <Grid container direction={width <= APP_THEME.breakpoints.values.md ? "column-reverse" : "row"} spacing={2} paddingBottom={1}>
            <Grid item xs={12} md={8}>
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

            <Grid item xs={12} md={4}>
                <ElementInViewport animation="fadeInRight" delay={500} sx={{height: "100%"}}>
                    <Box display="flex" justifyContent="center" alignItems="center" p={3} height="100%">
                        <img src={MobileDeviceGIF} style={{objectFit: "contain", height: "250px"}}/>
                    </Box>
                </ElementInViewport>
            </Grid>
        </Grid>
        </>
    )
};

export default GridLayer4;