import {createContext} from 'react';
import {ProjectItems} from './types';

export interface ProjectsContextType {
    isLoading: boolean;
    items: ProjectItems[];
};

export const INITIAL_PROJECTS_CONTEXT: ProjectsContextType = {
    isLoading: true,
    items: []
};

export const ProjectsContext = createContext<ProjectsContextType>(INITIAL_PROJECTS_CONTEXT);

// Actions
export const UPDATE_ITEMS = "UPDATE_ITEMS";
export const UPDATE_IS_LOADING = "UPDATE_IS_LOADING";

// Action dispatch type
export interface ProjectsContextAction {
    type: "UPDATE_ITEMS" | "UPDATE_IS_LOADING";
    payload: Partial<ProjectsContextType>;
};

// Reducer
export const ProjectsReducer = (state=INITIAL_PROJECTS_CONTEXT, action: ProjectsContextAction): ProjectsContextType => {
    switch (action.type) {
        case UPDATE_ITEMS: {
            return {
                ...state,
                items: action.payload.items as ProjectsContextType["items"]
            }
        };
        case UPDATE_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload.isLoading as ProjectsContextType["isLoading"]
            }
        }
        default: {
            return {...state};
        }
    }
};