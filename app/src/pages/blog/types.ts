
// All blog items from the get blogs API 
export interface BlogItems {
    name: string;
    date_created: string;
    read_time: number;
    slug: string;
    tags: string[];
};

// /get-blogs/ response
export interface GetBlogsAPIResponse {
    status: string;
    response: BlogItems[];
    imageURL: string;
}

// Individual blog items
export interface BlogItem extends BlogItems {
    content: string;
    short_description: string;
    suggestions: Omit<BlogItems, "tags">[];
}

// /read-blog/:slug response
export interface ReadBlogsAPIResponse {
    status: string;
    message?: string;
    payload?: BlogItem;
}
