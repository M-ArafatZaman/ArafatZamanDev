import {BASE} from '../../config';
import { defer, LoaderFunctionArgs} from 'react-router-dom';
import {LoaderFunction, LoaderArgs} from '@remix-run/node';
import { PortfolioAPIResponse } from './types';

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
}

// export const GetPortfolioItemsLoader = async ({request}: LoaderFunctionArgs) => {
//     const response: Promise<Response> = fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
//         method: "GET",
//         mode: "cors",
//         signal: request.signal
//     });

//     return defer({response});
// };

// Fetch function to view an individual portfolio item
export const VIEW_PORTFOLIO_ITEMS = "projects/api/view_portfolio_item/";
interface LoaderArgsWithSlugParam extends LoaderFunctionArgs {
    params: {
        slug?: string
    }
};
export const ViewPortfolioItemLoader = async ({request, params}: LoaderArgsWithSlugParam) => {
    const response: Promise<Response> = fetch(`${BASE}${VIEW_PORTFOLIO_ITEMS}${params.slug}/`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
}