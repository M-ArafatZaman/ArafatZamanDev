import {lazy} from 'react';

const MINIMUM_DELAY: number = 1000;

interface ImportReturnType {
    default: React.ComponentType<any>;
}

/* 
    A lazy import wrapper function that adds a minimum delay

    Usage => LazyImport(() => import("./test"))
*/

function LazyImport(funcImport: () => Promise<ImportReturnType>): React.LazyExoticComponent<React.ComponentType<any>> {
    return lazy(async () => {
        await new Promise((resolve) => setTimeout(resolve, MINIMUM_DELAY));
        return funcImport();
    });
};

export default LazyImport;