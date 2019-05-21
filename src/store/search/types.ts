import { IRecipe } from "../types";

export interface ISearchState{
    results: IRecipe[],
    loading: boolean,
    error: string
}

export const SEARCH_START = 'SEARCH_START';

interface ISearchStartAction {
    type: typeof SEARCH_START;
}

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

interface ISearchSuccessAction {
    type: typeof SEARCH_SUCCESS,
    recipes: IRecipe[]
}

export const SEARCH_FAILURE = 'SEARCH_FAILURE';

interface ISearchFailureAction {
    type: typeof SEARCH_FAILURE,
    error: string
}

export const SEARCH_CLEAR = 'SEARCH_CLEAR';

export interface ISearchClearAction {
    type: typeof SEARCH_CLEAR;    
}

export type SearchActionTypes = ISearchStartAction | ISearchSuccessAction | ISearchFailureAction | ISearchClearAction;