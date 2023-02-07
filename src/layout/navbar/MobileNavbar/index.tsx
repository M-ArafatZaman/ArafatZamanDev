import React from 'react';
// @ mui components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';


const MobileNavbar: React.FC = () => {

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            {/* Github button */}
            <IconButton href="https://github.com/M-ArafatZaman" target="_blank">
                <GitHubIcon/>
            </IconButton>
        </Box>
    )
};

export default MobileNavbar;