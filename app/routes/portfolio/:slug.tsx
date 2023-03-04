import React from 'react';
import {MetaFunction} from '@remix-run/node';
import {useParams} from '@remix-run/react';
// Import page component
import ViewPortfolio from '../../src/pages/portfolio/ViewPortfolio';
// Loader and types
import {ViewPortfolioItemLoader} from '../../src/pages/portfolio/loader';
import {ViewPortfolioItemAPIResponse} from '../../src/pages/portfolio/types';
// Meta function
import {MetaTags} from '../../src/utils';

export {ViewPortfolioItemLoader as loader};


export const meta: MetaFunction<typeof ViewPortfolioItemLoader> = ({data}) => MetaTags({
    title: data.payload.name,
    description: data.payload.short_description,
    image: data.payload.imageURL
})

export default ViewPortfolio;