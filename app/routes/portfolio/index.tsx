import React from 'react';
import {MetaFunction} from '@remix-run/node';
import {GetPortfolioItemsLoader} from '../../src/pages/portfolio/loader';
//import Portfolio from '../../src/pages/portfolio';
import PortfolioItems from '../../src/pages/portfolio/PortfolioItems';

// Loader
export {GetPortfolioItemsLoader as loader};

// Meta function
export const meta: MetaFunction<typeof GetPortfolioItemsLoader> = () => {
    return {
        title: "Portfolio Items | ArafatZaman",
        description: "View all my portfolio items.",
        image: "https://i.imgur.com/RIB4ych.png"
    }
}

// The default component
export default PortfolioItems;