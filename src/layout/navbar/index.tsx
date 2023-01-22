import React, {useEffect} from 'react';
import {useLocation, useNavigate, useMatch} from 'react-router-dom';
// @mui components
import {
    Box,
    Link,
    SxProps,
    IconButton
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
// Apptheme
import {APP_THEME} from '../../appTheme';

// NavLink Props style
interface NavLinkProps {
    label: string;
    href?: string;
    active?: boolean;
};
// The link component
const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const {href="", label, active=false} = props;


    // The link styles
    const LinkStyles: SxProps = {
        color: "#fff",
        textDecoration: "none",
        fontFamily: APP_THEME.typography.fontFamily,
        borderBottom: "3px solid rgba(255,255,255,0)",
        transition: "all ease-in-out 300ms",
        '&:hover': {
            color: "rgba(255,255,255,0.8)",
            borderBottom: active ? "3px solid rgba(255,255,255,0.3)" : "3px solid rgba(255,255,255,0.2)"
        },
        '&:active': {
            color: "rgba(255,255,255,0.2)"
        },
        ...(active ? {fontWeight: "bold", borderBottom: "3px solid rgba(255,255,255,0.3)"} : {})
        //fontWeight: "bold",
        //borderBottom: "3px solid rgba(255,255,255,0.3)"
    }

    return (
        <Box sx={{
            paddingX: 2,
            cursor: active ? "default" : "pointer"
        }}>
            <Link href={active ? "javascript:void(0)" : href} sx={LinkStyles}>{label}</Link>
        </Box>
    )
}

// The main navbar
const Navbar: React.FC = () => {

    // Get the location
    const PATH = window.location.pathname;

    useEffect(() => {
        console.log(window.location.pathname);
    }, [window.location.pathname]);
    
    return (
        <>
        <Box display="flex" flexDirection="row" alignItems="center">
            <NavLink
                label="HOME"
                href="/"
                active={PATH == "/"}
            />
            <NavLink
                label="PORTFOLIO"
                href="/portfolio/"
            />
            <NavLink
                label="PROJECTS"
                href="/projects/"
            />
            <NavLink
                label="BLOG"
                href="/blog/"
            />
            <NavLink
                label="CONTACT"
                href="/contact/"
            />
            {/* Github button */}
            <IconButton href="https://github.com/M-ArafatZaman" target="_blank">
                <GitHubIcon/>
            </IconButton>
        </Box>
        </>
    )
};

export default Navbar;