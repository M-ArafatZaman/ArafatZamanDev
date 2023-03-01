import {rest} from 'msw';
import {BASE} from '../../src/config';
import {GET_PROJECTS_ITEMS, VIEW_PROJECT_ITEM} from '../../src/pages/projects/loader';
import type { GetProjectsAPIResponse, ViewProjectAPIResponse } from '../../src/pages/projects/types';

// Endpoint for all portfolio items
const GET_PROJECTS_ENDPOINT = `${BASE}${GET_PROJECTS_ITEMS}`;
const VIEW_PROJECT_ENDPOINT = `${BASE}${VIEW_PROJECT_ITEM}`;

interface VIEW_PROJECTS_REQUEST {
    params: {
        slug: string;
    };
};

// Mocked responses for endpoints in the portfolio app
const MockProjectsHandlers = [
    // All Project items
    rest.get(GET_PROJECTS_ENDPOINT, (req, res, ctx) => {
        const response: GetProjectsAPIResponse = {
            status: "OK",
            items: [
                {
                    name: "Project Item 1",
                    short_description: "Description",
                    imageURL: "[LINK]",
                    slug: "project-item-1",
                }
            ]
        };
        
        return res(
            ctx.status(200),
            ctx.json(response)
        )
    }),
    // View an individual portfolio item
    rest.get(`${VIEW_PROJECT_ENDPOINT}:slug/`, (req: VIEW_PROJECTS_REQUEST, res, ctx) => {
        const {slug} = req.params;

        if (slug === "project-item-1") {
            // 200 response
            const response: ViewProjectAPIResponse = {
                status: "OK",
                item: {
                    name: "Project Item 1",
                    short_description: "Description",
                    content: "This is the content of Project Item 1",
                    imageURL: "[LINK]",
                    slug: "project-item-1",
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
    rest.get(GET_PROJECTS_ENDPOINT, (req, res, ctx) => {
        return res.once(
            ctx.status(404),
            ctx.json({
                status: "404",
            })
        )
    })
]

export default MockProjectsHandlers;
export {MockErrorHandlers};