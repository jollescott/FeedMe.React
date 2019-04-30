import { IRecipe } from "../types";

export interface IRecipeState{
    recipe: IRecipe | undefined,
    loading: boolean,
    error: string
}

export const LOAD_START = 'LOAD_START';

interface ILoadStartAction {
    type: typeof LOAD_START;
}

export const LOAD_SUCCESS = 'LOAD_SUCCESS';

interface ILoadSuccessAction {
    type: typeof LOAD_SUCCESS,
    recipe: IRecipe
}

export const LOAD_FAILURE = 'LOAD_FAILURE';

interface ILoaodFailureAction {
    type: typeof LOAD_FAILURE,
    error: string
}

export type RecipeActionTypes = ILoadStartAction | ILoadSuccessAction | ILoaodFailureAction;