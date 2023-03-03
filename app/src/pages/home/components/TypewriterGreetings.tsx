import React, {useState, createRef, useEffect} from 'react';
// @mui components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {SxProps, keyframes} from '@mui/material/styles';
// Emotion css
//import {keyframes} from '@mui/system';

const TypewriterGreetings: React.FC = () => {

    const Content: string[] = ["software developer", "freelancer", "motivated learner", "risk taker", "change maker"];
    const [currContent, setContent] = useState<number>(0);

    // Update content - Cycle back to first if current content is the last
    function updateContent() {
        setContent( (prevValue) => prevValue < Content.length-1 ? prevValue+1 : 0 );
    };

    
    // Typewriter container ref
    const ContainerRef: React.RefObject<HTMLElement> = createRef();
    
    // Typewriter animations
    const TypewriterKeyframes = keyframes`
    from {
        border-right-color: #2F3030;
    }
    to {
        border-right-color: rgba(47, 48, 48, 0);
    }
    `;

    // The rewrite content animation
    const RewriteContentKeyframes = keyframes`
    0% {
        width: 0%;
    }
    20% {
        width: 95%;
    }
    80% {
        width: 95%;
    }
    100% {
        width: 0%;
    }
    `;

    // Typewriter Container style
    // The container only animates the cursor
    const TypewriterContainer: SxProps = {
        borderRight: "5px solid #2F3030",
        display: "inline-block",
        pr: 1,
        animation: `${TypewriterKeyframes} 200ms ease infinite alternate, ${RewriteContentKeyframes} 1500ms linear infinite`,
        whiteSpace: "nowrap",
        textOverflow: "clip",
        overflow: "hidden",
        width: "95%"
    };

    // A string class should be added to the ref element to indicate that event listener has already been added.
    const ANIMATION_ADDED = "animation-added-i18xlkn";
    useEffect(() => {
        if (ContainerRef.current instanceof HTMLElement && typeof ContainerRef.current !== "undefined" && !ContainerRef.current.classList.contains(ANIMATION_ADDED)) {
            ContainerRef.current.addEventListener("animationiteration", (e: AnimationEvent) => {
                if (e.animationName === RewriteContentKeyframes.name) {
                    updateContent();
                }
            });
            // Add a class to indicate that animation has been added
            ContainerRef.current.classList.add(ANIMATION_ADDED);
        }
    }, [ContainerRef.current]);

    return (
        <Typography variant="h6" sx={{position: "relative", display: "flex", flexDirection: "row"}}>
            <Typography variant="inherit">I am a </Typography>

            <Box style={{display: "inline-block", position: "relative"}}><Typography variant="inherit" sx={TypewriterContainer} ref={ContainerRef}>&nbsp;{Content[currContent]}</Typography></Box>
        </Typography>
    );
};

export default TypewriterGreetings;