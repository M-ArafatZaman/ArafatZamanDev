import {LoaderFunction, LoaderArgs} from '@remix-run/node';
import {GetProjectsAPIResponse, ViewProjectAPIResponse} from './types';
import {prisma} from '../../dbconfig.server';
import {json} from 'react-router-dom';
import {marked} from 'marked';
// Endpoints
import {BASE} from '../../config';


const GET_PROJECTS_ITEMS = "projects/api/get_projects/";

// Fetch function to get portfolio items
export const GetProjectsLoader: LoaderFunction = async () => {
    const d = await fetch(`${BASE}${GET_PROJECTS_ITEMS}`, {
        method: "get",
        mode: "cors"
    })

    // Read data from data stream
    const data: GetProjectsAPIResponse = await d.json();

    // Add error checking
    if (data["status"] != "OK") {
        return json({
            status: data["status"]
        })
    }

    return json(data);
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

    // Parse data
    const contentMD: string = marked.parse(data.detail_description);

    const response: ViewProjectAPIResponse = {
        status: "OK",
        item: {
            name: data?.name as string,
            short_description: data?.short_description as string,
            content: data?.detail_description as string,
            imageURL: data?.image_url as string,
            slug: data?.slug as string,
            md: contentMD as string
        }
    };

    return json(response);
};