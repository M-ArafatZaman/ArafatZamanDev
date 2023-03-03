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
    error: boolean;
    errorMessage: string;
}

// This is the type of action that is to be dispatched
export interface PortfolioReducerActionType {
    type: string;
    payload?: Partial<BlogsContextType>;
}

export const INITIALIZE = "INITIALIZE";
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";
export const DELETE_DATA = "DELETE_DATA";
export const ERROR = "ERROR";
export const BlogsContext = createContext<BlogsContextType>({} as BlogsContextType);

export const BlogsReducer = (tasks: BlogsContextType, action: PortfolioReducerActionType): BlogsContextType  => {
    switch (action.type) {
        case UPDATE_ITEMS: {
            return {
                isLoading: false,    
                items: action.payload?.items as BlogItems[],
                error: false,
                errorMessage: "",
            };
        };
        case UPDATE_IS_LOADING: {
            return {
                ...tasks,
                isLoading: action.payload?.isLoading as boolean
            };
        };
        case INITIALIZE:
        case DELETE_DATA: {
            return {
                isLoading: true,
                items: [],
                error: false,
                errorMessage: "",
            };
        };
        case ERROR: {
            return {
                ...tasks,
                error: true,
                errorMessage: action.payload?.errorMessage || "An unknown error occured."
            }
        }
        default: {
            return {...tasks}
        };
    }
};

export const BLOGS_INITIAL_STATE: BlogsContextType = {
    isLoading: true,
    items: [],
    error: false,
    errorMessage: ""
};

