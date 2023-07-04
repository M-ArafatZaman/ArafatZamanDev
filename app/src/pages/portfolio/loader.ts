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

    // Get the main portfolio data that is important
    // const data = await prisma.portfolio.findFirst({
    //     where: {
    //         slug: params.slug
    //     },
    //     select: {
    //         name: true,
    //         short_description: true,
    //         content: true,
    //         image: true,
    //         tags: true,
    //         slug: true,
    //     }
    // });

    // // If nothing is found
    // if (!data) {
    //     return json({
    //         status: "Not Found."
    //     })
    // }

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

    // Get other navbar items
    // const otherItems = await prisma.portfolio.findMany({
    //     select: {
    //         name: true,
    //         slug: true
    //     },
    //     orderBy: {
    //         date_created: "desc"
    //     }
    // });


    // const response: ViewPortfolioItemAPIResponse = {
    //     status: "OK",
    //     payload: {
    //         name: data?.name as string,
    //         short_description: data?.short_description as string,
    //         content: data?.content as string,
    //         tags: data?.tags?.split(",") as string[],
    //         imageURL: data?.image as string,
    //         slug: data?.slug as string,
    //         other_portfolio_items: otherItems.map((elem) => ({
    //             name: elem.name as string,
    //             slug: elem.slug as string
    //         })),
    //         // Add marked content
    //         md: replacedFinal.html,
    //         js: [...replacedWithCarousel.js, ...replacedFinal.js]
    //     }
    // }

    return json(response);
};