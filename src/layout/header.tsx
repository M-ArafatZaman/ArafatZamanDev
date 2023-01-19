import React from 'react';
// @mui components
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    useTheme
} from '@mui/material';
import { SxProps } from '@mui/material/styles';
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

    return (
        /* Header container for the padding */
        <Box sx={{padding: '8px', pb: 0}}>
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
    );
};

export default Header;