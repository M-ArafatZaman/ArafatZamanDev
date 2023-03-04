import React from 'react';
import {MetaFunction} from '@remix-run/node';
import {GetPortfolioItemsLoader} from '../../src/pages/portfolio/loader';
import PortfolioItems from '../../src/pages/portfolio/PortfolioItems';
// Util functions
import {MetaTags} from '../../src/utils';

// Loader
export {GetPortfolioItemsLoader as loader};

// Meta function
export const meta: MetaFunction<typeof GetPortfolioItemsLoader> = () => MetaTags({
    title: "Portfolio items",
    description: "View all my portfolio items",
    image: "https://i.imgur.com/RIB4ych.png"
})

// The default component
export default PortfolioItems;