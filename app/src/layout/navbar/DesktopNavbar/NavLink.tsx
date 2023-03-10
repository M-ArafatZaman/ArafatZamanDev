import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from '@remix-run/react';
// @mui components
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import {SxProps} from '@mui/material/styles';
// App theme
import {APP_THEME} from '../../../appTheme';

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
            <Link sx={LinkStyles} onClick={onClick} href={href}>{label}</Link>
        </Box>
    )
}

export default NavLink;