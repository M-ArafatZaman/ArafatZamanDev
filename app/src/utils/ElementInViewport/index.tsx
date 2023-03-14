import React, {createRef, useEffect, useState} from 'react';
// @mui element
import Box from '@mui/material/Box';
import {SxProps} from '@mui/material/styles';
// Utils
import {isAnyPartOfElementInViewport} from '../viewport';

interface ElementInViewportProps {
    children: React.ReactNode;
    animation?: string;
    delay?: number;
    sx?: SxProps;
};

const HIDE_CLASSNAME = "ElementInViewport-pre";

/**
 * An element which triggers an animation once it is in viewport
 * @param props children: React.ReactNode, animation?: string, delay?: number
 * @returns 
 */
const ElementInViewport: React.FC<ElementInViewportProps> = (props: ElementInViewportProps) => {
    const {children, animation="fadeIn", delay=0, sx} = props;
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    // Hydration update
    useEffect(() => {
        setIsHydrated(true);
    }, []);

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
        if (
            ContainerElementRef.current instanceof HTMLElement && 
            typeof ContainerElementRef.current != "undefined" && 
            !ContainerElementRef.current.classList.contains("animate__animated"))
        {
            if (isAnyPartOfElementInViewport(ContainerElementRef.current)) {
                // The element is in view now
                // Remove the display none class and then add animation classes
                // Add the animation and remove the event listeners
                ContainerElementRef.current.classList.remove(HIDE_CLASSNAME);
                ContainerElementRef.current!.classList.add("animate__animated", `animate__${animation}`);
                WINDOW_EVENTS.forEach((elem) => {
                    window.removeEventListener(elem, onChange);
                })
            }
        }
    };

    // On component mount, add event listeners
    useEffect(() => {
        if (isHydrated) {
            // Remove the classes that are inplace when javascript is not added
            ContainerElementRef.current?.classList.remove("animate__animated", `animate__${animation}`, "animate__delay-1s");
            ContainerElementRef.current?.classList.add(HIDE_CLASSNAME);

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
        }
    }, [ContainerElementRef, isHydrated]);

    return (
        <Box sx={Style} ref={ContainerElementRef} className={["animate__animated", `animate__${animation}`, "animate__delay-1s"].join(" ")}>
            {children}
        </Box>
    ) 
};

export default ElementInViewport;
