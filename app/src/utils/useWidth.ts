import {useState, useEffect} from 'react';

const useWidth: () => number = () => {
    const [width, setWidth] = useState<number>(0);
    const [isHydrated, setIsHydrated] = useState<boolean>(false);

    // Hydration check
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Width check
    useEffect(() => {
        if (isHydrated) {
            const onResize = () => {
                setWidth(window.innerWidth);
            };
            window.addEventListener("resize", onResize);
            onResize();

            return () => {
                window.removeEventListener("resize", onResize);
            }
        }
    }, [isHydrated]);

    return width;
};

export default useWidth;