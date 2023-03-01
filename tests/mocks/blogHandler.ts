import {rest} from 'msw';
import {BASE} from '../../src/config';
import {GET_BLOGS, READ_BLOG} from '../../src/pages/blog/loader';
import type { GetBlogsAPIResponse, ReadBlogsAPIResponse } from '../../src/pages/blog/types';

// Endpoint for all portfolio items
const GET_BLOGS_ENDPOINT = `${BASE}${GET_BLOGS}`;
const READ_BLOG_ENDPOINT = `${BASE}${READ_BLOG}`;

interface READ_BLOG_REQUEST {
    params: {
        slug: string;
    };
};

// Mocked responses for endpoints in the portfolio app
const MockBlogHandlers = [
    // All Project items
    rest.get(GET_BLOGS_ENDPOINT, (req, res, ctx) => {
        const response: GetBlogsAPIResponse = {
            status: "OK",
            response: [
                {
                    name: "Blog Item 1",
                    date_created: "15/10/2003",
                    slug: "blog-item-1",
                    read_time: 5,
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
    rest.get(`${READ_BLOG_ENDPOINT}:slug/`, (req: READ_BLOG_REQUEST, res, ctx) => {
        const {slug} = req.params;

        if (slug === "blog-item-1") {
            // 200 response
            const response: ReadBlogsAPIResponse = {
                status: "OK",
                payload: {
                    name: "Blog Item 1",
                    date_created: "15/10/2003",
                    content: "This is the content of Blog Item 1",
                    slug: "blog-item-1",
                    read_time: 5,
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
    rest.get(GET_BLOGS_ENDPOINT, (req, res, ctx) => {
        return res.once(
            ctx.status(404),
            ctx.json({
                status: "404",
            })
        )
    })
]

export default MockBlogHandlers;
export {MockErrorHandlers};