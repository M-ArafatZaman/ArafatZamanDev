import {BASE} from '../../config';
import { defer, LoaderFunctionArgs} from 'react-router-dom';

// Fetch function to get portfolio items
const GET_PORTFOLIO_ITEMS = "/projects/api/get_portfolio_items/";

export const GetPortfolioItems = async ({request}: LoaderFunctionArgs) => {
    const response: Promise<Response> = fetch(`${BASE}${GET_PORTFOLIO_ITEMS}`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
};