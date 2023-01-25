interface PortfolioItem {
    name: string;
    short_description: string;
    content: string;
    imageURL: string;
    tags: string[];
};

/* API response from GET_PORTFOLIO_ITEMS, which returns ALL the portfolio items */
interface PortfolioAPIResponse {
    status: string;
    items: PortfolioItem[];
}

/* API response from VIEW_PORTFOLIO_ITEMS, which returns only a single portfolio item */
interface ViewPortfolioItemAPIResponse {
    status: string;
    payload: PortfolioItem;
}

export type {PortfolioItem, PortfolioAPIResponse, ViewPortfolioItemAPIResponse};