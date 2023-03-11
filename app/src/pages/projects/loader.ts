import {BASE} from '../../config';
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
    const ENDPOINT = `${BASE}${VIEW_PROJECT_ITEM}${params.slug}/`;
    const resp = await fetch(ENDPOINT, {
        method: "GET",
        mode: "cors"
    })
    .then((response) => response.json())
    .catch(() => {
        return {
            status: "Error"
        }
    }) as Promise<ViewProjectAPIResponse>;
    return resp;
};