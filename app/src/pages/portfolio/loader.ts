import {LoaderFunction, LoaderArgs} from '@remix-run/node';
import { PortfolioAPIResponse, ViewPortfolioItemAPIResponse } from './types';
import {prisma} from '../../dbconfig.server';
import {json} from 'react-router-dom';
// Parsers
import {marked} from 'marked';
import {replaceContentWithCarousel, replaceContentWithIphone} from '../../components/Carousel/';
// Endpoints
import {BASE} from '../../config';

export const GET_PORTFOLIO_ITEMS = "projects/api/get_portfolio_items/";

// Fetch function to get portfolio items
export const GetPortfolioItemsLoader: LoaderFunction = async () => {
    // Revert back to getting data from portfolio website]
    const d = await fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
        method: "GET",
        mode: "cors"
    });

    const response: PortfolioAPIResponse = await d.json();

    return json(response);
};

// Fetch function to view an individual portfolio item
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};

export const VIEW_PORTFOLIO_ITEMS = "projects/api/view_portfolio_item/";

export const ViewPortfolioItemLoader: LoaderFunction = async ({params}: LoaderArgsWithSlugParam) => {

    const d = await fetch(`${BASE}${VIEW_PORTFOLIO_ITEMS}${params.slug}`, {
        method: "GET",
        mode: "cors"
    });

    const data: ViewPortfolioItemAPIResponse = (await d.json());
    
    console.log(data);

    if (data["status"] != "OK") {
        return json({"status": "Not Found."});
    }

    // Parse content
    const contentMD: string = marked.parse(data["payload"].content);
    // Replace to parse normal carousel and then parse iphone carousel
    const replacedWithCarousel = replaceContentWithCarousel(contentMD);
    const replacedFinal = replaceContentWithIphone(replacedWithCarousel.html);

    let response: ViewPortfolioItemAPIResponse = data;
    response["payload"]["md"] = replacedFinal.html
    response["payload"]["js"] = [...replacedWithCarousel.js, ...replacedFinal.js];

    return json(response);
};