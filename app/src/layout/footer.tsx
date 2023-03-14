import React from 'react';
import {useNavigate} from '@remix-run/react';
// @mui components
import {SxProps} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
// APP THEME
import {APP_THEME} from '../appTheme';
// @mui icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LaunchIcon from '@mui/icons-material/Launch';
import ExploreIcon from '@mui/icons-material/Explore';
// Logo and SVGS
import LOGO from '../media/logo/Logo-filled.svg';

// A custom link component with custom props
interface CustomLinkProps {
    children?: JSX.Element | JSX.Element[] | string;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    startIcon?: JSX.Element;
}

const AppLink: React.FC<CustomLinkProps> = (props: CustomLinkProps) => {
    const {children, href="#", target="_blank", startIcon} = props;
    
    let iconStyles: SxProps = {};
    
    if (typeof startIcon != "undefined") {
        iconStyles = {
            pl: 1
        };
    };

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
        },
        ...iconStyles
    }
    
    const navigate = useNavigate();
    // On click
    const onClick = (e: React.MouseEvent) => {
        // Regex
        const externalWebsite = /^(?!https?:\/\/)/;
        if (href.match(externalWebsite) !== null) {
            // Then href is not an external website
            e.preventDefault();
            navigate(href);
        }
        // Else go ahead.
    }

    return (
        <Box>
            <Box display="flex" flexDirection="row" alignItems="center">
                {startIcon}
                <Link href={href} sx={LinkStyles} target={target} onClick={onClick}>{children}</Link>
            </Box>
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
                                {/* Wrapped in box for the icon */}
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <ExploreIcon sx={{color: "#fff"}}/>
                                    <Typography variant="h6" sx={{color: "#fff", pl: 1}}>Explore</Typography>
                                </Box>
                                <Box p={2} pt={0}>
                                    <AppLink href="/portfolio/">Portfolio</AppLink>
                                    <AppLink href="/projects/">Projects</AppLink>
                                    <AppLink href="/blog/">Blog</AppLink>
                                    <AppLink href="/contact/">Contact</AppLink>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Socials */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{borderLeft: "1px solid #656565"}} px={3} height="100%">
                                {/* Wrapped in box for the icon */}
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <LaunchIcon sx={{color: "#fff"}}/>
                                    <Typography variant="h6" sx={{color: "#fff", pl: 1}}>Socials</Typography>
                                </Box>
                                <Box p={2} pt={0}>
                                    <AppLink 
                                        startIcon={<LinkedInIcon sx={{color: "#0072b1"}}/>}
                                        href="https://www.linkedin.com/in/m-arafatzaman/"
                                    >LinkedIn</AppLink>
                                    <AppLink 
                                        startIcon={<TwitterIcon sx={{color: "#00acee"}}/>}
                                        href="https://twitter.com/mdarafatzaman11"    
                                    >Twitter</AppLink>
                                    <AppLink 
                                        startIcon={<FacebookIcon sx={{color: "#3b5998"}}/>}
                                        href="https://www.facebook.com/mdarafatzaman01/"
                                    >Facebook</AppLink>
                                    <AppLink 
                                        startIcon={<InstagramIcon sx={{color: "#d62976"}}/>}
                                        href="https://www.instagram.com/mohammadarafatzaman/"
                                    >Instagram</AppLink>
                                    <AppLink 
                                        startIcon={<GitHubIcon sx={{color: "#171515"}}/>}
                                        href="https://github.com/M-ArafatZaman"
                                    >Github</AppLink>
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