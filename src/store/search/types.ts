export interface IRecipe{
    recipeId: string;
}

export interface IIngredient{
    ingredientId: string;
}

export interface ISearchState{
    results: IRecipe[];
}

export const SEARCH_START = 'SEARCH_START';

interface ISearchStartAction {
    type: typeof SEARCH_START;
    ingredients: IIngredient[] 
}

export type SearchActionTypes = ISearchStartAction;