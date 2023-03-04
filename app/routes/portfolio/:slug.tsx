import React from 'react';
import {MetaFunction} from '@remix-run/node';
// Import page component
import ViewPortfolio from '../../src/pages/portfolio/ViewPortfolio';
// Loader and types
import {ViewPortfolioItemLoader} from '../../src/pages/portfolio/loader';
// Meta function
import {MetaTags} from '../../src/utils';

export {ViewPortfolioItemLoader as loader};


export const meta: MetaFunction<typeof ViewPortfolioItemLoader> = ({data}) => {
    if (data.status !== "OK") {
        return MetaTags({
            title: "Not found.",
            description: "Sorry! Could not locate any relevant portfolio resource.",
            image: "https://i.imgur.com/orYlTL7.png"
        })
    }

    return MetaTags({
        title: data.payload.name,
        description: data.payload.short_description,
        image: data.payload.imageURL
    })
};

export default ViewPortfolio;