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
    const data = await prisma.portfolio.findMany({
        select: {
            name: true,
            short_description: true,
            image: true,
            tags: true,
            slug: true,
        },
        orderBy: {
            date_created: "desc"
        }
    });

    // If nothing is found, an error must have occured
    if (!data) {
        return json({
            status: "Not Found."
        })
    };

    // Revert back to getting data from portfolio website
    const d = await fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
        method: "GET",
        mode: "cors"
    });

    console.log(d)

    const response: PortfolioAPIResponse = {
        status: "OK",
        items: data.map((elem) => ({
            "name": elem.name as string,
            "short_description": elem.short_description as string,
            "imageURL": elem.image as string,
            "tags": elem.tags?.split(",") as string[],
            "slug": elem.slug as string
        }))
    };

    return json(response);
};

// Fetch function to view an individual portfolio item
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};

export const ViewPortfolioItemLoader: LoaderFunction = async ({params}: LoaderArgsWithSlugParam) => {

    // Get the main portfolio data that is important
    const data = await prisma.portfolio.findFirst({
        where: {
            slug: params.slug
        },
        select: {
            name: true,
            short_description: true,
            content: true,
            image: true,
            tags: true,
            slug: true,
        }
    });

    // If nothing is found
    if (!data) {
        return json({
            status: "Not Found."
        })
    }

    // Get other navbar items
    const otherItems = await prisma.portfolio.findMany({
        select: {
            name: true,
            slug: true
        },
        orderBy: {
            date_created: "desc"
        }
    });

    // Parse content
    const contentMD: string = marked.parse(data.content);
    // Replace to parse normal carousel and then parse iphone carousel
    const replacedWithCarousel = replaceContentWithCarousel(contentMD);
    const replacedFinal = replaceContentWithIphone(replacedWithCarousel.html);

    const response: ViewPortfolioItemAPIResponse = {
        status: "OK",
        payload: {
            name: data?.name as string,
            short_description: data?.short_description as string,
            content: data?.content as string,
            tags: data?.tags?.split(",") as string[],
            imageURL: data?.image as string,
            slug: data?.slug as string,
            other_portfolio_items: otherItems.map((elem) => ({
                name: elem.name as string,
                slug: elem.slug as string
            })),
            // Add marked content
            md: replacedFinal.html,
            js: [...replacedWithCarousel.js, ...replacedFinal.js]
        }
    }

    return json(response);
};