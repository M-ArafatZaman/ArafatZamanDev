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