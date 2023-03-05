import {BASE} from '../../config';
import { LoaderFunction, LoaderArgs } from '@remix-run/node';
// @types
import {GetBlogsAPIResponse, ReadBlogsAPIResponse} from './types';

// Fetch function to get portfolio items
export const GET_BLOGS = "blogs/api/get_blogs/";
export const GetBlogsLoader: LoaderFunction = async () => {
    const ENDPOINT = `${BASE}${GET_BLOGS}`;
    const resp = await fetch(ENDPOINT, {
        method: "GET",
        mode: "cors"
    })
    .then((response) => response.json())
    .catch(() => {
        return {
            status: "Error"
        }
    }) as Promise<GetBlogsAPIResponse>;
    return resp;
};

// Fetch function to view an individual portfolio item
export const READ_BLOG = "blogs/api/read_blog/";
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};
export const ReadBlogLoader: LoaderFunction = async ({params}: LoaderArgsWithSlugParam) => {
    const ENDPOINT = `${BASE}${READ_BLOG}${params.slug}/`;
    const resp = await fetch(ENDPOINT, {
        method: "GET",
        mode: "cors"
    })
    .then((response) => response.json())
    .catch(() => {
        return {
            status: "Error"
        }
    }) as Promise<ReadBlogsAPIResponse>;
    return resp;
}