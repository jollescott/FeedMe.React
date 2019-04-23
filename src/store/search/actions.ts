import { IIngredient, SearchActionTypes } from "./types";

export function startSearch(query: IIngredient[]): SearchActionTypes{
    return {
        ingredients: query,
        type: 'SEARCH_START'
    }
}