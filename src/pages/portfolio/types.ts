interface PortfolioItem {
    name: string;
    short_description: string;
    content: string;
    tags: string[];
};

interface PortfolioAPIResponse {
    status: string;
    items: PortfolioItem[];
}

export type {PortfolioItem, PortfolioAPIResponse};