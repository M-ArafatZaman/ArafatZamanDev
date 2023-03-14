import React, {createRef} from 'react';
// @mui components
import Box from '@mui/material/Box';
// Lottie player and the loading animation
import {Player} from '@lottiefiles/react-lottie-player';
import LoadingAnimationJSON from '../media/lottie/loadingAnimation.json';

const Loader: React.FC = () => {

    const ContainerRef: React.RefObject<HTMLElement> = createRef();

    // Set the container ref 

    return (
        <Box sx={{
            display: "flex",
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
            width: "100%"
        }}>
            <Box>
                <Player 
                    loop
                    autoplay
                    src={LoadingAnimationJSON}
                    style={{height: "200px", width: "200px"}}
                />
            </Box>
        </Box>
    )
};

export default Loader;