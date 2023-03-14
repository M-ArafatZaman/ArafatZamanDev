import {BASE} from '../../config';
import { LoaderFunction, LoaderArgs } from '@remix-run/node';
// @types
import {GetBlogsAPIResponse, ReadBlogsAPIResponse} from './types';
import {prisma} from '../../dbconfig.server';
import { getReadTime, formatDate, generateShortDescription } from '../../utils';
import { json } from 'react-router-dom';
import {marked} from 'marked';

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

    // If nothing is found, an error occured
    if (!data) {
        return json({
            status: "Error"
        })
    }

    const response: GetBlogsAPIResponse = {
        status: "OK", 
        response: data.map((elem) => ({
            name: elem.name as string,
            date_created: formatDate(elem.date_created) as string,
            tags: elem.tags?.split(" ") as string[],
            slug: elem.slug as string,
            read_time: getReadTime(elem.content) as number
        }))
    }
    return json(response);
};

// Fetch function to view an individual portfolio item
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};
export const ReadBlogLoader: LoaderFunction = async ({params}: LoaderArgsWithSlugParam) => {

    const data = await prisma.blogs.findFirst({
        where: {
            slug: params.slug
        },
        select: {
            name: true,
            date_created: true,
            content: true,
            tags: true,
            slug: true,
            image: true
        }
    });

    // If nothing is found
    if (!data) {
        return json({
            status: "Not Found."
        })
    }

    const suggestions = await prisma.blogs.findMany({
        orderBy: {
            date_created: "desc"
        },
        where: {
            NOT: {
                slug: params.slug
            }
        },
        take: 3,
        select: {
            name: true,
            date_created: true,
            content: true,
            slug: true
        }
    });

    const response: ReadBlogsAPIResponse = {
        status: "OK",
        payload: {
            name: data?.name as string,
            date_created: formatDate(data?.date_created as Date) as string,
            tags: data?.tags?.split(" ") as string[],
            slug: data?.slug as string,
            read_time: getReadTime(data?.content as string) as number,
            content: data?.content as string,
            short_description: generateShortDescription(data?.content as string),
            imageURL: data?.image as string,
            suggestions: suggestions.map((elem) => ({
                name: elem.name as string,
                date_created: formatDate(elem.date_created),
                slug: elem.slug as string,
                read_time: getReadTime(elem.content)
            })),
            md: marked.parse(data.content as string)
        }
    }

    return json(response);
}