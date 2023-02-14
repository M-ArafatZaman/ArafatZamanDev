import {createContext} from 'react';
import {ProjectItems} from './types';

export interface ProjectsContextType {
    isLoading: boolean;
    items: ProjectItems[];
    error: boolean;
    errorMessage: string;
};

export const INITIAL_PROJECTS_CONTEXT: ProjectsContextType = {
    isLoading: true,
    items: [],
    error: false,
    errorMessage: "",
};

export const ProjectsContext = createContext<ProjectsContextType>(INITIAL_PROJECTS_CONTEXT);

// Actions
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";
export const DELETE_ITEMS = "DELETE_ITEMS";
export const ERROR = "ERROR";

// Action dispatch type
export interface ProjectsContextAction {
    type: "UPDATE_ITEMS" | "UPDATE_IS_LOADING" | "DELETE_ITEMS" | "ERROR";
    payload?: Partial<ProjectsContextType>;
};

// Reducer
export const ProjectsReducer = (state=INITIAL_PROJECTS_CONTEXT, action: ProjectsContextAction): ProjectsContextType => {
    switch (action.type) {
        case UPDATE_ITEMS: {
            return {
                ...state,
                items: action.payload?.items as ProjectsContextType["items"]
            }
        };
        case UPDATE_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload?.isLoading as ProjectsContextType["isLoading"]
            }
        };
        case DELETE_ITEMS: {
            return {
                isLoading: true,
                items: [],
                error: false,
                errorMessage: ""
            }
        };
        case ERROR: {
            return {
                ...state,
                error: true,
                errorMessage: action.payload?.errorMessage || "An unknown error occured."
            }
        };
        default: {
            return {...state};
        }
    }
};