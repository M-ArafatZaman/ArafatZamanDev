import React from 'react';
// @mui components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
// Other components
import AppCard from '../../home/components/AppCard';

/* Each portfolio item - They are each rendered in a grid container  */
interface PortfolioItemGridProps {
    name: string;
    short_description: string;
    image: string;
    tags: string[];
};

const PortfolioItemGrid: React.FC<PortfolioItemGridProps> = (props: PortfolioItemGridProps) => {
    const {name, short_description, image, tags} = props;

    return (
        <Grid item xs={12} md={4}>
            <AppCard>
                {/* Image */}
                <Box display="flex" justifyContent="center" alignItems="center" sx={{position: "relative"}}>
                    <img src={image} style={{objectFit: "contain", width: "100%"}}/>
                    {/* Overlay */}
                    <Box sx={{
                        position: "absolute",
                        top: 0, bottom: 0, left: 0, right: 0,
                        background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))"
                    }}/>
                </Box>

                {/* Content */}
                <Box sx={{p: 2, pt: 0}}>
                    <Typography variant="h4">{name}</Typography>
                    {tags.map((str) => <Chip label={str} size="small" color="info" sx={{mr: 1}}/>)}
                    <Divider sx={{my: 1}}/>
                    <Typography variant="body2">{short_description}</Typography>
                </Box>

                {/* Button */}
                <Box sx={{p: 2, backgroundColor: "rgba(0,0,0,.05)"}}>
                    <Button>View</Button>
                </Box>
            </AppCard>
        </Grid>
    )
};

export default PortfolioItemGrid;
export type {PortfolioItemGridProps};