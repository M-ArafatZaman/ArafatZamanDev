import {createContext} from 'react';
import {PortfolioItems} from './types';

export interface PortfolioContextType {
    isLoading: boolean;
    items: PortfolioItems[];
    error: boolean;
    errorMessage: string;
}

export interface PortfolioReducerActionType {
    type: string;
    payload?: Partial<PortfolioContextType>;
}

export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";
export const DELETE_ITEMS = "DELETE_ITEMS";
export const ERROR = "ERROR";
export const PortfolioContext = createContext<PortfolioContextType>({} as PortfolioContextType);

export const PortfolioReducer = (tasks: PortfolioContextType, action: PortfolioReducerActionType): PortfolioContextType  => {
    switch (action.type) {
        case UPDATE_ITEMS: {
            return {
                isLoading: false,
                items: action.payload?.items as PortfolioItems[],
                error: false,
                errorMessage: ""
            };
        };
        case UPDATE_IS_LOADING: {
            return {
                ...tasks,
                isLoading: action.payload?.isLoading as boolean
            };
        };
        case DELETE_ITEMS: {
            return {
                isLoading: true,
                items: [],
                error: false,
                errorMessage: ""
            }
        };
        case ERROR:
            return {
                ...tasks,
                error: true,
                errorMessage: action.payload?.errorMessage || "Sorry, an unknown error occured!"
            }
        default: {
            return {...tasks}
        };
    }
};

export const PORTFOLIO_INITIAL_STATE: PortfolioContextType = {
    isLoading: true,
    items: [],
    error: false,
    errorMessage: ""
};

