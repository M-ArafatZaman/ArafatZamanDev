import React, {createRef, useEffect} from 'react';
// @mui element
import {
    Box,
    SxProps
} from '@mui/material'
// Utils
import {isAnyPartOfElementInViewport} from './viewport';

interface ElementInViewportProps {
    children: React.ReactNode;
    animation?: string;
    delay?: number;
    sx?: SxProps;
}

/**
 * An element which triggers an animation once it is in viewport
 * @param props children: React.ReactNode, animation?: string, delay?: number
 * @returns 
 */
const ElementInViewport: React.FC<ElementInViewportProps> = (props: ElementInViewportProps) => {
    const {children, animation="fadeIn", delay=1000, sx} = props;

    const Style: SxProps = {
        animationDelay: `${delay}ms`,
        ...sx
    };

    // Container element
    const ContainerElementRef: React.RefObject<HTMLElement> = createRef<HTMLElement>();

    type WindowEvent = "DOMContentLoaded" | "load" | "scroll" | "resize";

    const WINDOW_EVENTS: WindowEvent[] = ["DOMContentLoaded", "load", "scroll", "resize"];

    // On load, scroll, and resize
    const onChange = () => {
        if (ContainerElementRef.current instanceof HTMLElement && typeof ContainerElementRef.current != "undefined" && !ContainerElementRef.current.classList.contains("animate__animated")) {
            if (isAnyPartOfElementInViewport(ContainerElementRef.current)) {
                // The element is in view now
                // Add the animation and remove the event listeners
                ContainerElementRef.current.classList.add("animate__animated", `animate__${animation}`);
                WINDOW_EVENTS.forEach((elem) => {
                    window.removeEventListener(elem, onChange);
                })
            }
        }
    };

    // On component mount, add event listeners
    useEffect(() => {
        WINDOW_EVENTS.forEach((event) => {
            window.addEventListener(event, onChange);
        });
        // Call on change when the component is mounted
        onChange();

        // On componentUnMount / Destructor
        return () => {
            WINDOW_EVENTS.forEach((event) => {
                window.removeEventListener(event, onChange);
            })
        };
    }, [])

    return (
        <Box sx={Style} ref={ContainerElementRef}>
            {children}
        </Box>
    ) 
};

export default ElementInViewport;
