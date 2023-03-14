import React, {useEffect, useState} from 'react';
// @mui 
import Box from '@mui/material/Box';
import {SxProps, useTheme} from '@mui/material/styles';
// Individual navbars
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { useWidth } from '../../utils';

const MOBILE_NAVBAR_WIDTH = 750;
// The main navbar
const Navbar: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    useEffect(() => {
        setIsHydrated(true);
    }, [])

    const width = useWidth();
    const theme = useTheme();
    
    const NAVS = {
        desktop: <DesktopNavbar/>,
        mobile: <MobileNavbar/>
    };

    const NavbarContainer: SxProps = {
        [theme.breakpoints.down(MOBILE_NAVBAR_WIDTH)]: {
            "& > .mobile-nav-container": {
                display: "block"
            },
            "& > .desktop-nav-container": {
                display: "none"
            }
        },
        [theme.breakpoints.up(MOBILE_NAVBAR_WIDTH)]: {
            "& > .mobile-nav-container": {
                display: "none"
            },
            "& > .desktop-nav-container": {
                display: "block"
            }
        }
    }
    
    // Render so that proper navbar is displayed even if js is disabled
    if (!isHydrated) {
        return (
            <Box sx={NavbarContainer}>
                <div className="mobile-nav-container">
                    {NAVS["mobile"]}
                </div>
    
                <div className="desktop-nav-container">
                    {NAVS["desktop"]}
                </div>
            </Box>
        );
    }

    return width > MOBILE_NAVBAR_WIDTH ? NAVS["desktop"] : NAVS["mobile"];
};

export default Navbar;