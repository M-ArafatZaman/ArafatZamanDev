import {BASE} from '../../config';
import {LoaderFunction, LoaderArgs} from '@remix-run/node';
import { PortfolioAPIResponse, ViewPortfolioItemAPIResponse } from './types';

// Fetch function to get portfolio items
export const GET_PORTFOLIO_ITEMS = "projects/api/get_portfolio_items/";

export const GetPortfolioItemsLoader: LoaderFunction = async () => {
    const ENDPOINT = `${BASE}${GET_PORTFOLIO_ITEMS}`;
    const resp = await fetch(ENDPOINT, {
        method: "GET",
        mode: "cors"
    })
    .then((response) => response.json())
    .catch(() => {
        return {
            status: "Error"
        }
    }) as Promise<PortfolioAPIResponse>;
    return resp;
};

// Fetch function to view an individual portfolio item
export const VIEW_PORTFOLIO_ITEMS = "projects/api/view_portfolio_item/";
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};

export const ViewPortfolioItemLoader: LoaderFunction = async ({params}: LoaderArgsWithSlugParam) => {
    const ENDPOINT = `${BASE}${VIEW_PORTFOLIO_ITEMS}${params.slug}/`;
    const resp = await fetch(ENDPOINT, {
        method: "GET",
        mode: "cors"
    })
    .then((response) => response.json())
    .catch(() => {
        return {
            status: "Error"
        }
    }) as Promise<ViewPortfolioItemAPIResponse>;
    return resp;
};