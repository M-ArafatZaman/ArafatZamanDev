import {BASE} from '../../config';
import { LoaderFunction, LoaderArgs } from '@remix-run/node';
// @types
import {GetBlogsAPIResponse, ReadBlogsAPIResponse} from './types';
import {prisma} from '../../dbconfig.server';
import { getReadTime, formateDate } from '../../utils';
import { json } from 'react-router-dom';

// Fetch function to get portfolio items
export const GetBlogsLoader: LoaderFunction = async () => {
    const data = await prisma.blogs.findMany({
        select: {
            name: true,
            date_created: true,
            content: true,
            tags: true,
            slug: true
        },
        orderBy: {
            date_created: "desc"
        }
    });

    const response: GetBlogsAPIResponse = {
        status: "OK", 
        response: data.map((elem) => ({
            name: elem.name as string,
            date_created: formateDate(elem.date_created) as string,
            tags: elem.tags?.split(" ") as string[],
            slug: elem.slug as string,
            read_time: getReadTime(elem.content) as number
        }))
    }
    return json(response);
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