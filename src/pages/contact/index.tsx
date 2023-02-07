import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// App theme
import {APP_THEME} from '../../appTheme';
// Other components
import AppCard from '../home/components/AppCard';
import ProgrammerVibin from './media/programmer_vibin.gif';

/* The Contact page */
const Contact: React.FC = () => {

    return (
        <Container sx={{p: 2}}>
            <AppCard>
                <Box 
                    py={2} px={4}
                    display="flex" alignItems="center" 
                    sx={{backgroundColor: APP_THEME.palette.primary.light}}
                >
                    <Grid container spacing={2}>
                        {/* Gif */}
                        <Grid item xs={12} md="auto">
                            <img src={ProgrammerVibin} style={{objectFit: "contain", maxWidth: "400px"}} />
                        </Grid>

                        {/* Contact info */}
                        <Grid item xs={12} md sx={{backgroundColor:"rgba(255,255,255,0)"}}>
                            <AppCard sx={{height: "100%", width: "100%", backgroundColor:"rgba(255,255,255,0)"}}>
                                <Box
                                    sx={{
                                        p: 2,
                                        backgroundColor: "rgba(255,255,255,0.6)",
                                        transition: "all 200ms ease-in-out",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.85)"
                                        },
                                        height: "100%",
                                        width: "100%"
                                    }}
                                >
                                    TEST
                                </Box>
                            </AppCard>
                        </Grid>
                    </Grid>
                </Box>
            </AppCard>
            
        </Container>
    );
};

export default Contact;