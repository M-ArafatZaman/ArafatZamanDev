import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
// @ mui components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// @mui icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import TerminalIcon from '@mui/icons-material/Terminal';
import FeedIcon from '@mui/icons-material/Feed';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
// The navlink component
import NavItem from './NavItems';


const MobileNavbar: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();

    
    // Openers and closers of the navigation drawer
    const handleClose = () => {
        setOpen(false);
    }
    
    const handleOpen = () => {
        setOpen(true);
    }
    
    // Whenever the location is updated, close the drawer
    useEffect(() => {
        handleClose();
    }, [location.pathname]);
    
    return (
        <>
        <Box display="flex" flexDirection="row" alignItems="center">
            {/* Github button */}
            <IconButton onClick={handleOpen}>
                <MenuIcon htmlColor="#fff"/>
            </IconButton>
        </Box>

        {/* Drawer */}
        <Drawer
            open={open}
            anchor="bottom"
            onClose={handleClose}
        >
            <Box>
                <List>
                    <ListSubheader>Navigation</ListSubheader>
                    <NavItem
                        href="/"
                        label="Home"
                        icon={<HomeIcon/>}
                    />
                    <NavItem
                        href="/portfolio/"
                        label="Portfolio"
                        icon={<WorkIcon/>}
                    />
                    <NavItem
                        href="/projects/"
                        label="Projects"
                        icon={<TerminalIcon/>}
                    />
                    <NavItem
                        href="/blog/"
                        label="Blog"
                        icon={<FeedIcon/>}
                    />
                    <NavItem
                        href="/contact/"
                        label="Contact"
                        icon={<MailOutlineIcon/>}
                    />
                    <Divider/>

                    <ListSubheader>Others</ListSubheader>
                    <ListItemButton href="https://github.com/M-ArafatZaman" target="_blank">
                        <ListItemIcon><GitHubIcon/></ListItemIcon>
                        <ListItemText>Github</ListItemText>
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
        </>
    )
};

export default MobileNavbar;