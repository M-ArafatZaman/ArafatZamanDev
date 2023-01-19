import React from 'react';
// @mui components
import {
    Box,
    SxProps,
    Typography,
    Grid,
    Divider,
    Container,
    Link
} from '@mui/material';
// APP THEME
import {APP_THEME} from '../appTheme';
// Logo and SVGS
import LOGO from '../media/logo/Logo-filled.svg';

// A custom link component with custom props
interface CustomLinkProps {
    children?: JSX.Element | JSX.Element[] | string;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

const AppLink: React.FC<CustomLinkProps> = (props: CustomLinkProps) => {
    const {children, href="#", target="_self"} = props;

    // Styles
    const LinkStyles: SxProps = {
        color: "#CBCBCB",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: 14,
        transition: "all 150ms ease-in-out",
        "&:hover": {
            textDecoration: "underline",
            color: "#ECECEC"
        },
        "&:active": {
            color: "rgba(236,236,236,0.5)"
        }
    }

    return (
        <Box>
            <Link href={href} sx={LinkStyles} target={target}>{children}</Link>
        </Box>
    )
}

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
                {/* Footer content */}
                <Container>
                    <Grid container spacing={2}>
                        {/* Tag */}
                        <Grid item xs={12} md={4}>
                            <Box display="flex" alignItems="center">
                                <img src={LOGO} width={50} height={50}/>
                                <Typography variant="h6" sx={{pl: 1, color: "#fff"}}>ArafatZaman</Typography>
                            </Box>
                        </Grid>

                        {/* Site map */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{borderLeft: "1px solid #656565"}} px={3} height="100%">
                                <Typography variant="h6" sx={{color: "#fff"}}>Explore</Typography>
                                <Box p={2} pt={0}>
                                    <AppLink>Portfolio</AppLink>
                                    <AppLink>Projects</AppLink>
                                    <AppLink>Blog</AppLink>
                                    <AppLink>Contact</AppLink>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Socials */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{borderLeft: "1px solid #656565"}} px={3} height="100%">
                                <Typography variant="h6" sx={{color: "#fff"}}>Socials</Typography>
                                <Box p={2} pt={0}>
                                    <AppLink>LinkedIn</AppLink>
                                    <AppLink>Github</AppLink>
                                    <AppLink>Twitter</AppLink>
                                    <AppLink>Facebook</AppLink>
                                    <AppLink>Instagram</AppLink>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

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