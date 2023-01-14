import React from 'react';
import {Box, SxProps} from '@mui/material';
import {APP_THEME} from '../../../appTheme';

interface AppCardProps {
    children: JSX.Element | JSX.Element[];
    sx?: SxProps 
};

function AppCard(props: AppCardProps) {
    const {children, sx} = props;

    const ContainerStyles: SxProps = {
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: APP_THEME.shadows[3],
        position: "relative",
        overflow: "hidden"
    };

    return (
        <Box sx={[ContainerStyles, ...(Array.isArray(sx) ? sx : [sx])]}>
            {children}
        </Box>
    )
};

export default AppCard;