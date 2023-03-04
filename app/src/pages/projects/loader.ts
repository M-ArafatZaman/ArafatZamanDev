import {BASE} from '../../config';
import {LoaderFunction, LoaderArgs} from '@remix-run/node';
import {GetProjectsAPIResponse, ViewProjectAPIResponse} from './types';

// Fetch function to get portfolio items
export const GET_PROJECTS_ITEMS = "projects/api/get_projects/";
export const GetProjectsLoader: LoaderFunction = async () => {
    const ENDPOINT = `${BASE}${GET_PROJECTS_ITEMS}`;
    const resp = await fetch(ENDPOINT, {
        method: "GET",
        mode: "cors"
    })
    .then((response) => response.json())
    .catch(() => {
        return {
            status: "Error"
        }
    }) as Promise<GetProjectsAPIResponse>;
    return resp;
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