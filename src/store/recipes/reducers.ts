import { IRecipeState, RecipeActionTypes } from "./types";

const initialState: IRecipeState = {
    error: '',
    loading: false,
    recipe: undefined
}

export function ingredientReducer(state = initialState, action: RecipeActionTypes) : IRecipeState {
    switch(action.type){
        case 'LOAD_START':
            return {
                ...state,
                loading: true
            };
        case 'LOAD_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'LOAD_SUCCESS':
            return {
                ...state,
                recipe: state.recipe,
                loading: false
            }
        default: 
            return state;
    }
}