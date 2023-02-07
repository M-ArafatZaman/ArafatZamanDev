import React from 'react';
// @ mui components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// @mui icons
import GitHubIcon from '@mui/icons-material/GitHub';
// Other components
import NavLink from './NavLink';


const DesktopNavbar: React.FC = () => {

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <NavLink
                label="HOME"
                href="/"
            />
            <NavLink
                label="PORTFOLIO"
                href="/portfolio/"
                />
            <NavLink
                label="PROJECTS"
                href="/projects/"
            />
            <NavLink
                label="BLOG"
                href="/blog/"
                />
            <NavLink
                label="CONTACT"
                href="/contact/"
            />
            {/* Github button */}
            <IconButton href="https://github.com/M-ArafatZaman" target="_blank">
                <GitHubIcon/>
            </IconButton>
        </Box>
    )
};

export default DesktopNavbar;