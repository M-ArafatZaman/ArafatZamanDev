import {BASE} from '../../config';
import { defer, LoaderFunctionArgs} from 'react-router-dom';

// Fetch function to get portfolio items
const GET_PORTFOLIO_ITEMS = "/projects/api/get_portfolio_items/";

export const GetPortfolioItemsLoader = async ({request}: LoaderFunctionArgs) => {
    const response: Promise<Response> = fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
};

// Fetch function to view an individual portfolio item
const VIEW_PORTFOLIO_ITEMS = "/projects/api/view_portfolio_item/";
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