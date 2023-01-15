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
        <AppCard>
            {/* Image */}
            <Box display="flex" justifyContent="center" py={2} px={1}>
                <img src={image} style={{height: "200px", objectFit: "contain"}} />
            </Box>
            {/* Content */}
            <Box p={2}>
                {children}
            </Box>
        </AppCard>
    )
};

export default FeatureCard;