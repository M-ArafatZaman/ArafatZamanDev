import React, {createContext} from 'react';
import {BlogItems} from './types';

/**
 * The purpose of this context is very similar to that of the portfolio/portfolioContext
 * A global context to store *ALL* the blogs but without their content so that their slugs
 * Can be used through to provide easy link access
 */

export interface BlogsContextType {
    isLoading: boolean;
    items: BlogItems[];
}

// This is the type of action that is to be dispatched
export interface PortfolioReducerActionType {
    type: string;
    payload: Partial<BlogsContextType>;
}

export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";
export const BlogsContext = createContext<BlogsContextType>({} as BlogsContextType);

export const BlogsReducer = (tasks: BlogsContextType, action: PortfolioReducerActionType): BlogsContextType  => {
    switch (action.type) {
        case UPDATE_ITEMS: {
            return {
                isLoading: false,
                items: action.payload.items as BlogItems[]
            };
        };
        case UPDATE_IS_LOADING: {
            return {
                ...tasks,
                isLoading: action.payload.isLoading as boolean
            };
        };
        default: {
            return {...tasks}
        };
    }
};

export const BLOGS_INITIAL_STATE: BlogsContextType = {
    isLoading: true,
    items: []
};

