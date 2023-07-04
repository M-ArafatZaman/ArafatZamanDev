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
    const d = await fetch(`${BASE}${VIEW_PROJECT_ITEM}${params.slug}`, {
        method: "get",
        mode: "cors"
    });

    // Read data from data stream
    const data: ViewProjectAPIResponse = await d.json();
    
    // Check for error
    if (data["status"] != "OK") {
        json({
            status: data["status"]
        })
    };

    // Parse content as md
    const contentMD: string = marked.parse(data["item"]["content"]);

    // Prepare response
    const response: ViewProjectAPIResponse = {
        status: data["status"],
        item: {
            ...data["item"],
            md: contentMD
        }
    };

    return json(response);
};