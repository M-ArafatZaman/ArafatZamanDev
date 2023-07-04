import {BASE} from '../../config';
import { LoaderFunction, LoaderArgs } from '@remix-run/node';
// @types
import {GetBlogsAPIResponse, ReadBlogsAPIResponse} from './types';
import {prisma} from '../../dbconfig.server';
import { getReadTime, formatDate, generateShortDescription } from '../../utils';
import { json } from 'react-router-dom';
import {marked} from 'marked';

export const GET_BLOGS = "blogs/api/get_blogs/";
// Fetch function to get portfolio items
export const GetBlogsLoader: LoaderFunction = async () => {
    const d = await fetch(`${BASE}${GET_BLOGS}`, {
        method: "get",
        mode: "cors"
    });

    // Read data stream 
    const data: GetBlogsAPIResponse = await d.json();

    // Check for error
    if (data["status"] != "OK") {
        return json({
            status: data["status"]
        })
    }

    return json(data);
};

// Fetch function to view an individual portfolio item
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};
export const READ_BLOG = "blogs/api/read_blog/";

export const ReadBlogLoader: LoaderFunction = async ({params}: LoaderArgsWithSlugParam) => {

    const d = await fetch(`${BASE}${READ_BLOG}${params.slug}`, {
        method: "get",
        mode: "cors"
    });

    // Read data from data stream
    const data: ReadBlogsAPIResponse = await d.json();

    // Check for error
    if (data["status"] != "OK") {
        return json({status: data["status"]})
    };

    // Parse content 
    const contentMD: string = marked.parse(data["payload"] ? data["payload"]["content"] : "");

    if (typeof data.payload != "undefined") {
        const response: ReadBlogsAPIResponse = {
            status: "OK",
            payload: {
                ...data.payload,
                md: contentMD
            }
        }

        return json(response);
    } else {
        return json({status: "Fetch Error Occured."})
    }

}