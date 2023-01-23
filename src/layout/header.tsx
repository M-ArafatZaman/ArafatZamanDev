import React, {createRef, useEffect} from 'react';
// @mui components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { SxProps, useTheme } from '@mui/material/styles';
// Page components
import Navbar from './navbar';

// Logo imports
import LOGO from '../media/logo/Logo-filled.svg';


const Header: React.FC = () => {
    const THEME = useTheme();
    
    // Header styles
    const headerStyles: SxProps = {
        borderRadius: '8px',
        backgroundColor: THEME.palette.secondary.main,
        boxShadow: THEME.shadows[6],
        padding: 1
    };

    // Header container styles
    const headerContainerStyles: SxProps = {
        position: "fixed",
        zIndex: 1000,
        top: 0, left: 0, right: 0,
        padding: "8px",
        pb: 0,
        backdropFilter: "blur(16px)"
    };

    // Header ref and header backdrop ref
    const HeaderRef: React.RefObject<HTMLElement> = createRef<HTMLElement>();
    const HeaderBackdropRef: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

    // Add event listener so that the backdrop mimics the height of the header
    useEffect(() => {
        const onResize = () => {
            if (
                HeaderRef.current instanceof HTMLElement && 
                HeaderBackdropRef.current instanceof HTMLDivElement && 
                typeof HeaderRef.current !== "undefined" &&
                typeof HeaderBackdropRef.current !== "undefined"
            ) {
                HeaderBackdropRef.current.style.height = `${HeaderRef.current.clientHeight}px`;
            }
        };
        // Execute it once
        onResize();

        window.addEventListener("resize", onResize);

        // Remove event listener on destructor
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, [])

    return (
        <Box sx={{position: "relative"}}>
            {/* Header container for the padding */}
            <Box sx={headerContainerStyles} ref={HeaderRef}>
                {/* The header */}
                <Box sx={headerStyles}>
                    <Container>
                        <Box display="flex" flexDirection="row">
                            {/* The logo */}
                            <Box display="flex" flexGrow={1}>
                                <img src={LOGO} style={{height: 50, width: 50}} />
                            </Box>

                            {/* Nav bar */}
                            <Navbar/>
                        </Box>
                    </Container>
                </Box>
            </Box>
            
            {/* A header backdrop */}
            <div ref={HeaderBackdropRef} style={{width: "100%"}}></div>
        </Box>
    );
};

export default Header;