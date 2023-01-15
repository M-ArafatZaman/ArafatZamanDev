import React from 'react';
// @mui components
import {
    Box
} from '@mui/material';
// Extras
import AppCard from './AppCard';

interface FeatureCardProps {
    image: string;
    children: JSX.Element | JSX.Element[];
}

function FeatureCard(props: FeatureCardProps) {

    const {children, image} = props;

    return (
        <AppCard sx={{
            transition: "all 300ms linear",
            ':hover': {
                transform: "scale(1.05)"
            }
        }}>
            {/* Image */}
            <Box display="flex" justifyContent="center" py={2} px={1} sx={{backgroundColor: "#C3FFFB"}}>
                <img src={image} style={{height: "200px", objectFit: "contain"}} />
            </Box>
            {/* Content */}
            <Box p={3}>
                {children}
            </Box>
        </AppCard>
    )
};

export default FeatureCard;