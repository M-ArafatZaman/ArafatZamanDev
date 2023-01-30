import React, {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
// @mui icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Other components
import AppCard from '../home/components/AppCard';
// App theme
import {APP_THEME} from '../../appTheme';
// Context
import {PortfolioContext} from './portfolioContext';

const ViewPortfolioNavbar: React.FC = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const params = useParams<{slug: string}>();
    const PContext = useContext(PortfolioContext);
    const navigate = useNavigate();

    // When the menu button is clicked, toggle the buttons
    const toggleButton = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <AppCard sx={{backgroundColor: APP_THEME.palette.primary.main}}>
            <Box p={2} display="flex" alignItems="center">
                <IconButton onClick={toggleButton}><MenuIcon/></IconButton>
                <Typography variant="h6">Contents</Typography>
            </Box>

            {/* Buttons */}
            <Collapse in={!collapsed}>
                <Box p={2} sx={{borderTop: "1px solid rgba(0,0,0,.15)"}}>
                    <Box sx={{mb: 1}}>
                        <Typography variant="caption" sx={{color: "rgba(0,0,0,.65)"}}><b>NAVIGATION</b></Typography>
                        <Button 
                            variant="contained"
                            color="info"
                            startIcon={<ArrowBackIcon/>} 
                            fullWidth
                            onClick={() => {navigate(`/portfolio/`)}}
                        >Go to portfolio</Button>
                    </Box>

                    <Typography variant="caption" sx={{color: "rgba(0,0,0,.65)"}}><b>PORTFOLIO ITEMS</b></Typography>
                    {PContext.items.map((P_ITEMS, i) => (
                        <Button 
                            key={i}
                            fullWidth 
                            variant="contained" 
                            sx={{backgroundColor: "rgba(255,255,255,0.4)", my: 0.5}}
                            onClick={() => {navigate(`/portfolio/${P_ITEMS.slug}`)}}
                            disabled={params.slug == P_ITEMS.slug}
                        >{P_ITEMS.name}</Button>
                    ))}
                </Box>
            </Collapse>
        </AppCard>
    )
};

export default ViewPortfolioNavbar;