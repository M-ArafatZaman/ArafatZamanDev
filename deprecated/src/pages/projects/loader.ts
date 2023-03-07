import {BASE} from '../../config';
import { defer, LoaderFunctionArgs } from 'react-router-dom';

// Fetch function to get portfolio items
export const GET_PROJECTS_ITEMS = "projects/api/get_projects/";
export const GetProjectsLoader = async ({request}: LoaderFunctionArgs) => {
    const response: Promise<Response> = fetch(`${BASE}${GET_PROJECTS_ITEMS}`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
};

// Fetch function to view an individual portfolio item
export const VIEW_PROJECT_ITEM = "projects/api/view_project/";
interface LoaderArgsWithSlugParam extends LoaderFunctionArgs {
    params: {
        slug?: string
    }
};
export const ViewProjectLoader = async ({request, params}: LoaderArgsWithSlugParam) => {
    const response: Promise<Response> = fetch(`${BASE}${VIEW_PROJECT_ITEM}${params.slug}/`, {
        method: "GET",
        mode: "cors",
        signal: request.signal
    });

    return defer({response});
}