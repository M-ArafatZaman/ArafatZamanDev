import React, {useState} from 'react';
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


const MobileNavbar: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

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
                    <ListItemButton>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><WorkIcon/></ListItemIcon>
                        <ListItemText>Portfolio</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><TerminalIcon/></ListItemIcon>
                        <ListItemText>Projects</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><FeedIcon/></ListItemIcon>
                        <ListItemText>Blog</ListItemText>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><MailOutlineIcon/></ListItemIcon>
                        <ListItemText>Contact</ListItemText>
                    </ListItemButton>

                    <Divider/>

                    <ListSubheader>Others</ListSubheader>
                    <ListItemButton>
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