interface PortfolioItems {
    name: string;
    short_description: string;
    imageURL: string;
    slug: string;
    tags: string[];
}

// A single portfolio item
interface PortfolioItem extends PortfolioItems {
    content: string;
    other_portfolio_items: {
        name: string;
        slug: string;
    }[]
};

/* API response from GET_PORTFOLIO_ITEMS, which returns ALL the portfolio items */
interface PortfolioAPIResponse {
    status: string;
    items: PortfolioItems[];
}

/* API response from VIEW_PORTFOLIO_ITEMS, which returns only a single portfolio item */
interface ViewPortfolioItemAPIResponse {
    status: string;
    payload: PortfolioItem;
}

export type {PortfolioItem, PortfolioItems, PortfolioAPIResponse, ViewPortfolioItemAPIResponse};