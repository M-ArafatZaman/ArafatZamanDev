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
// Individual navbars
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

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
        desktop: <DesktopNavbar/>,
        mobile: <MobileNavbar/>
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