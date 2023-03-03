import React, {useEffect, useState} from 'react';
// Individual navbars
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const MOBILE_NAVBAR_WIDTH = 750;
// The main navbar
const Navbar: React.FC = () => {
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);

    // Event listener to update width
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };

        if (isHydrated) {
            window.addEventListener("resize", updateWidth);            
        } else {
            setIsHydrated(true)
        }

        // Remove event listener on unmount
        return () => {
            if (isHydrated) {
                window.removeEventListener("resize", updateWidth);
            }
        }
    }, []);
    
    const NAVS = {
        desktop: <DesktopNavbar/>,
        mobile: <MobileNavbar/>
    }

    return width > MOBILE_NAVBAR_WIDTH ? NAVS["desktop"] : NAVS["mobile"];
};

export default Navbar;