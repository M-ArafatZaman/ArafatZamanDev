import {rest} from 'msw';
import {BASE} from '../../src/config';
import {GET_PORTFOLIO_ITEMS, VIEW_PORTFOLIO_ITEMS} from '../../src/pages/portfolio/loader';
import type { PortfolioAPIResponse, ViewPortfolioItemAPIResponse } from '../../src/pages/portfolio/types';

// Endpoint for all portfolio items
const GET_PORTFOLIO_ENDPOINT = `${BASE}${GET_PORTFOLIO_ITEMS}`;
const VIEW_PORTFOLIO_ENDPOINT = `${BASE}${VIEW_PORTFOLIO_ITEMS}`;

interface VIEW_PORTFOLIO_REQUEST {
    params: {
        slug: string;
    };
};

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
                    imageURL: "[LINK]",
                    slug: "portfolio-item-1",
                    tags: ["tag1"]
                }
            ]
        };
        
        return res(
            ctx.status(200),
            ctx.json(response)
        )
    }),
    // View an individual portfolio item
    rest.get(`${VIEW_PORTFOLIO_ENDPOINT}:slug/`, (req: VIEW_PORTFOLIO_REQUEST, res, ctx) => {
        const {slug} = req.params;

        if (slug === "portfolio-item-1") {
            // 200 response
            const response: ViewPortfolioItemAPIResponse = {
                status: "OK",
                payload: {
                    name: "Portfolio Item 1",
                    short_description: "Description",
                    content: "This is a great portfolio",
                    imageURL: "[LINK]",
                    slug: "portfolio-item-1",
                    tags: ["tag1"]
                }
            };
            return res(
                ctx.status(200),
                ctx.json(response)
            );
        } else {
            // Else a 404 response
            return res(ctx.status(404));
        }
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