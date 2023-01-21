import React, {createRef} from 'react';
// @mui components
import {
    Box
} from '@mui/material';

const Loader: React.FC = () => {

    const ContainerRef: React.RefObject<HTMLElement> = createRef();

    // Set the container ref 

    return (
        <Box sx={{
            display: "flex",
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <Box>RED</Box>
        </Box>
    )
};

export default Loader;