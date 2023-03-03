import React, {useEffect, useState} from 'react';
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