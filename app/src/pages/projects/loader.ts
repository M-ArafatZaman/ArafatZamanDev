import {LoaderFunction, LoaderArgs} from '@remix-run/node';
import {GetProjectsAPIResponse, ViewProjectAPIResponse} from './types';
import {prisma} from '../../dbconfig.server';
import {json} from 'react-router-dom';

// Fetch function to get portfolio items
export const GetProjectsLoader: LoaderFunction = async () => {
    const data = await prisma.projects.findMany({
        select: {
            name: true,
            short_description: true,
            image_url: true,
            slug: true,
        },
        orderBy: {
            date_created: "desc"
        }
    });

    // If nothing is found, an error must have occured
    if (!data) {
        return json({
            status: "Not Found."
        })
    }

    const response: GetProjectsAPIResponse = {
        status: "OK",
        items: data.map((elem) => ({
            name: elem.name as string,
            short_description: elem.short_description as string,
            imageURL: elem.image_url as string,
            slug: elem.slug as string
        })) 
    };

    return json(response);
};

// Fetch function to view an individual portfolio item
export const VIEW_PROJECT_ITEM = "projects/api/view_project/";
interface LoaderArgsWithSlugParam extends LoaderArgs {
    params: {
        slug?: string
    }
};
export const ViewProjectLoader = async ({params}: LoaderArgsWithSlugParam) => {
    const data = await prisma.projects.findFirst({
        where: {
            slug: params.slug
        },
        select: {
            name: true,
            short_description: true,
            detail_description: true,
            image_url: true,
            slug: true,
        }
    });

    // If not found
    if (!data) {
        return json({
            status: "Not Found."
        })
    }

    const response: ViewProjectAPIResponse = {
        status: "OK",
        item: {
            name: data?.name as string,
            short_description: data?.short_description as string,
            content: data?.detail_description as string,
            imageURL: data?.image_url as string,
            slug: data?.slug as string
        }
    };

    return json(response);
};