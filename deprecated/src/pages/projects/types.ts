export interface ProjectItems {
    name: string;
    short_description: string;
    slug: string;
    imageURL: string;
};

// API response from /get-projects/
export interface GetProjectsAPIResponse {
    status: string;
    items: ProjectItems[];
}

export interface ProjectItem extends ProjectItems {
    content: string;
}

// API response from /view_project/
export interface ViewProjectAPIResponse {
    status: string;
    item: ProjectItem;
}