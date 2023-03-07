import React from 'react';
import {keyframes} from '@emotion/react';
import Box from '@mui/material/Box';

// Keyframes and css
const FadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;


interface FadeInWrapperProps {
    //children: JSX.Element | React.ComponentType<any>
    children: React.ReactNode
}

const FadeInWrapper: React.FC<FadeInWrapperProps> = (props: FadeInWrapperProps) => {

    return (
        <Box 
            sx={(theme) => ({
                animation: `${FadeIn} 1000ms ${theme.transitions.easing.easeInOut}`
            })}
        >
            {props.children}
        </Box>
    )
}

export default FadeInWrapper;