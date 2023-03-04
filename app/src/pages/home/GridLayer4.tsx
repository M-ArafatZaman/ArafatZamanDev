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
import {APP_THEME} from '../../../src/appTheme';


const GridLayer4: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);

    // Hydration check for SSR
    useEffect(() => {
        if (!isHydrated) {
            setIsHydrated(true);
        }
    }, [])

    // On mount after hydration, add event listener
    // On unmount, remove that event listener to update the state
    useEffect(() => {
        if (isHydrated) {
            const updateWidth = () => {
                setWidth(window.innerWidth);
            };
            window.addEventListener("resize", updateWidth);
            updateWidth();
            // Destructor
            return () => {
                window.removeEventListener("resize", updateWidth);
                
            }
        }
    }, [isHydrated]);

    return (
        <>
        <Grid container direction={width <= APP_THEME.breakpoints.values.md ? "column-reverse" : "row"} spacing={2} paddingBottom={1}>
            <Grid item xs={12} md={8}>
                <ElementInViewport>
                    <AppCard>
                        <Box p={2}>
                            {/* The lyrics finder */}
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <PhoneIphoneIcon fontSize='large'/>
                                <Typography variant="h5" sx={{ml: 1}}>InPeril</Typography>
                            </Box>

                            <Divider sx={{my: 1}}/>

                            <Typography>
                                InPeril is a powerful and innovative mobile application designed to provide users with enhanced safety and security measures.
                                <br/><br/>
                                Utilizing the latest technologies, including <b>React-Native</b>, nativebase design library, Redux, Firebase, and several other cutting-edge React Native libraries, InPeril seamlessly integrates robust mobile features, including <b>live-location tracking</b>, emergency contact alerts, and an intuitive UI/UX design.
                                <br/><br/>
                                I'm particularly proud of this project, as it represents a significant milestone in my journey as a mobile application developer. Through InPeril, I've been able to showcase my ability to craft sophisticated and powerful applications that meet the needs and expectations of modern users.
                                <br/><br/>
                                Whether you're an avid traveler, outdoor enthusiast, or simply seeking an added layer of security in your daily life, InPeril offers a powerful and reliable solution that empowers you to navigate the world with confidence. Download it now on <LinkIcon href="https://play.google.com/store/apps/details?id=com.inperil" target="_blank" icon={<LaunchIcon fontSize="small"/>}>AndroidOS</LinkIcon> and experience the power of InPeril for yourself.
                            </Typography>
                        </Box>
                    </AppCard>
                </ElementInViewport>
            </Grid>

            <Grid item xs={12} md={4}>
                <ElementInViewport>
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