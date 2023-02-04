import React from 'react';
import {useNavigate} from 'react-router-dom';
// @mui components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {SxProps} from '@mui/material/styles';
// @mui icons
import AccountTreeIcon from '@mui/icons-material/AccountTree';
// Other components
import AppCard from '../../home/components/AppCard';
// Types
import {ProjectItems} from '../types';

/* Each projects item - They are each rendered in a grid container  */
interface PortfolioItemGridProps extends ProjectItems{};

const PortfolioItemGrid: React.FC<PortfolioItemGridProps> = (props: PortfolioItemGridProps) => {
    const {name, short_description, slug } = props;
    const navigate = useNavigate();

    // On hover style
    const onHoverStyle: SxProps = {
        transition: "all 300ms linear",
        "&:hover": {
            transform: "scale(1.03)",
            backgroundColor: "rgba(0,0,0,.15)"
        },
        "&:active": {
            backgroundColor: "rgba(0,0,0,.45)"
        },
        // Style for the appcard
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer"
    };

    return (
        <Grid item xs={12} md={3}>
            <AppCard sx={onHoverStyle}>
                {/* Title */}
                <Box sx={{p:2, pb: 1}} display="flex" flexDirection="row" alignItems="start">
                    <AccountTreeIcon sx={{mt: .5}} />
                    <Typography variant="h6" sx={{ml: 1}}><b>{name}</b></Typography>
                </Box>

                {/* Content */}
                <Box sx={{p: 2}}>
                    <Typography variant="body2">{short_description}</Typography>
                </Box>
            </AppCard>
        </Grid>
    )
};

export default PortfolioItemGrid;
export type {PortfolioItemGridProps};