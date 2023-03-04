import React, {useEffect, useState} from 'react';
// Individual navbars
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const MOBILE_NAVBAR_WIDTH = 750;
// The main navbar
const Navbar: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    
    // Hydation check
    useEffect(() => {
        setIsHydrated(true);
    }, [])

    // Event listener to update width
    useEffect(() => {
        if (isHydrated) {
            const updateWidth = () => {
                setWidth(window.innerWidth);
            };
            
            window.addEventListener("resize", updateWidth);            
            updateWidth();
    
            // Remove event listener on unmount
            return () => {
                window.removeEventListener("resize", updateWidth);
            }
        }
    }, [isHydrated]);
    
    const NAVS = {
        desktop: <DesktopNavbar/>,
        mobile: <MobileNavbar/>
    }

    return width > MOBILE_NAVBAR_WIDTH ? NAVS["desktop"] : NAVS["mobile"];
};

export default Navbar;