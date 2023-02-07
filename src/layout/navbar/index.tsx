import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import {SxProps} from '@mui/material/styles';
// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
// Apptheme
import {APP_THEME} from '../../appTheme';

// NavLink Props style
interface NavLinkProps {
    label: string;
    href?: string;
};
// The link component
const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
    const {href="", label} = props;

    const navigate = useNavigate();
    const currLocation = useLocation();
    
    // is the current location begins with href
    const isCurrLocation = (): boolean => {
        if (href !== "/") {
            return currLocation.pathname.match(new RegExp("^"+href)) !== null;
        };
        return currLocation.pathname === "/";
    };

    const [active, setActive] = useState<boolean>(isCurrLocation());
    
    // Event listener for when the current location changes
    useEffect(() => {
        setActive(isCurrLocation());
    }, [currLocation]);

    // Even listener for on click
    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // Only update if current link is not the current location
        if (currLocation.pathname != href) {
            navigate(href);
        }
    };

    // The link styles
    const LinkStyles: SxProps = {
        color: "#fff",
        textDecoration: "none",
        fontFamily: APP_THEME.typography.fontFamily,
        borderBottom: "3px solid rgba(255,255,255,0)",
        transition: "all ease-in-out 300ms",
        // Only add the following styles if the current button is active
        '&:hover': active ? {} : {
            color: "rgba(255,255,255,0.8)",
            borderBottom: "3px solid rgba(255,255,255,0.2)"
        },
        '&:active': active ? {} : {
            color: "rgba(255,255,255,0.2)"
        },
        ...(active ? {fontWeight: "bold", borderBottom: "3px solid rgba(255,255,255,0.3)"} : {})

    }

    return (
        <Box sx={{
            paddingX: 2,
            cursor: active ? "default" : "pointer"
        }}>
            <Link sx={LinkStyles} onClick={onClick}>{label}</Link>
        </Box>
    )
}

const MOBILE_NAVBAR_WIDTH = 750;
// The main navbar
const Navbar: React.FC = () => {

    const [width, setWidth] = useState<number>(window.innerWidth);

    // Event listener to update width
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", updateWidth);

        // Remove event listener on unmount
        return () => {
            window.removeEventListener("resize", updateWidth);
        }
    }, []);
    
    const NAVS = {
        desktop: (
            <Box display="flex" flexDirection="row" alignItems="center">
                <NavLink
                    label="HOME"
                    href="/"
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
        ),
        mobile: (
            <Box>Shorter nav</Box>
        )
    }

    return (
        <>
        {
            width > MOBILE_NAVBAR_WIDTH ? NAVS["desktop"] : NAVS["mobile"]
        }
        </>
    )
};

export default Navbar;