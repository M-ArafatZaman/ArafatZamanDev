import {rest} from 'msw';
import {BASE} from '../../src/config';
import {GET_PORTFOLIO_ITEMS} from '../../src/pages/portfolio/loader';
import type { PortfolioAPIResponse } from '../../src/pages/portfolio/types';

// Endpoint for all portfolio items
const GET_PORTFOLIO_ENDPOINT = `${BASE}${GET_PORTFOLIO_ITEMS}`

// Mocked responses for endpoints in the portfolio app
const MockPortfolioHandlers = [
    // All portfolio items
    rest.get(GET_PORTFOLIO_ENDPOINT, (req, res, ctx) => {

        const response: PortfolioAPIResponse = {
            status: "OK",
            items: [
                {
                    name: "Portfolio Item 1",
                    short_description: "Description",
                    imageURL: "https://arafatzaman.dev/logo.png",
                    slug: "portfolio-item-1",
                    tags: ["tag1"]
                }
            ]
        };
        
        return res(
            ctx.status(200),
            ctx.json(response)
        )
    })
];

// Mocked error responses
const MockErrorHandlers = [
    // All portfolio items
    rest.get(GET_PORTFOLIO_ENDPOINT, (req, res, ctx) => {
        return res.once(
            ctx.status(404),
            ctx.json({
                status: "404",
            })
        )
    })
]

export default MockPortfolioHandlers;
export {MockErrorHandlers};