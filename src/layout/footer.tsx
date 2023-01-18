import React from 'react';
// @mui components
import {
    Box,
    SxProps,
    Typography,
    Grid,
    Divider
} from '@mui/material';
// APP THEME
import {APP_THEME} from '../appTheme';

const Footer: React.FC = () => {

    const FooterStyles: SxProps = {
        backgroundColor: "#1A4F3B",
        borderRadius: "8px",
        boxShadow: APP_THEME.shadows[6]
    };

    // Get current year
    const YEAR = new Date().getFullYear();

    return (
        /* Header container */
        <Box sx={{padding: 1}}>
            {/* Footer */}
            <Box sx={FooterStyles}>
                <Grid container>

                </Grid>

                {/* Tag */}
                <Box sx={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: 2,
                    color: "#fff"
                }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    {/* The tag is put inside another box to make the <hr/> work */}
                    <Box>
                        <Typography>Mohammad Arafat Zaman &copy; {YEAR}</Typography>
                        <Divider sx={{borderColor: "darkgrey"}}/>
                        <Typography variant="subtitle2" textAlign="center" color="#C1C8CA">All rights reserved</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default Footer;