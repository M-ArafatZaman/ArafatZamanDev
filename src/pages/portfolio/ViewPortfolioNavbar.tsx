import React, {useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// Other components
import AppCard from '../home/components/AppCard';
// App theme
import {APP_THEME} from '../../appTheme';
// Context
import {PortfolioContext} from './portfolioContext';

const ViewPortfolioNavbar: React.FC = () => {

    const params = useParams<{slug: string}>();
    const PContext = useContext(PortfolioContext);
    const navigate = useNavigate();

    return (
        <AppCard sx={{backgroundColor: APP_THEME.palette.primary.main}}>
            <Box p={2}>
                <Typography variant="h6">Contents</Typography>
                <Divider sx={{my: 1}}/>
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
        </AppCard>
    )
};

export default ViewPortfolioNavbar;