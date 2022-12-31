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

// Logo imports
const LOGO = require("../media/logo/Logo-filled.svg").default as string;


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
        <Box sx={{padding: '8px'}}>
            {/* The header */}
            <Box sx={headerStyles}>
                <Container>
                    {/* The logo */}
                    <Box flexDirection="row">
                        <img src={LOGO} style={{height: 50, width: 50}} />
                    </Box>

                    {/* Nav bar */}
                </Container>
            </Box>
        </Box>
    );
};

export default Header;