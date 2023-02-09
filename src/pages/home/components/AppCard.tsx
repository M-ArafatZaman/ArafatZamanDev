import React from 'react';
// @mui Components
import Box from '@mui/material/Box';
import {SxProps} from '@mui/material/styles';
import {APP_THEME} from '../../../appTheme';

interface AppCardProps {
    children: JSX.Element | JSX.Element[];
    sx?: SxProps 
};

/**
 * Custom app card 
 * @param props A sx prop similar to @mui components and a children(s)
 * @returns 
 */
const AppCard: React.FC<AppCardProps> = (props: AppCardProps) => {
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