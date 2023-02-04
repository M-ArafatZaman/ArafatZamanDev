import {createContext} from 'react';
import {PortfolioItems} from './types';

export interface PortfolioContextType {
    isLoading: boolean;
    items: PortfolioItems[];
}

export interface PortfolioReducerActionType {
    type: string;
    payload: Partial<PortfolioContextType>;
}

export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";
export const DELETE_ITEMS = "DELETE_ITEMS";
export const PortfolioContext = createContext<PortfolioContextType>({} as PortfolioContextType);

export const PortfolioReducer = (tasks: PortfolioContextType, action: PortfolioReducerActionType): PortfolioContextType  => {
    switch (action.type) {
        case UPDATE_ITEMS: {
            return {
                isLoading: false,
                items: action.payload.items as PortfolioItems[]
            };
        };
        case UPDATE_IS_LOADING: {
            return {
                ...tasks,
                isLoading: action.payload.isLoading as boolean
            };
        };
        case DELETE_ITEMS: {
            return {
                isLoading: true,
                items: []
            }
        }
        default: {
            return {...tasks}
        };
    }
};

export const PORTFOLIO_INITIAL_STATE: PortfolioContextType = {
    isLoading: true,
    items: []
};

