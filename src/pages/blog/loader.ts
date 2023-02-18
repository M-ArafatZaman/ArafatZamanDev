import {BASE} from '../../config';
import { defer, LoaderFunctionArgs } from 'react-router-dom';

// Fetch function to get portfolio items
const GET_BLOGS = "/blogs/api/get_blogs/";
export const GetBlogsLoader = async ({request}: LoaderFunctionArgs) => {
    const response: Promise<Response> = fetch(`${BASE}${GET_BLOGS}`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
};

// Fetch function to view an individual portfolio item
const READ_BLOG = "/blogs/api/read_blog/";
interface LoaderArgsWithSlugParam extends LoaderFunctionArgs {
    params: {
        slug?: string
    }
};
export const ReadBlogLoader = async ({request, params}: LoaderArgsWithSlugParam) => {
    const response: Promise<Response> = fetch(`${BASE}${READ_BLOG}${params.slug}/`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
}