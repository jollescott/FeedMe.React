import { IIngredientState, IngredientActionTypes } from "./types";

const initialState: IIngredientState = {
    error: '',
    loading: false,
    results: [],
    ingredients: []
}

export function ingredientReducer(state = initialState, action: IngredientActionTypes) : IIngredientState {
    switch(action.type){
        case 'SEARCH_START':
            return {
                ...state,
                loading: true
            };
        case 'SEARCH_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case 'SEARCH_SUCCESS':
            return {
                ...state,
                results: action.recipes,
                loading: false
            }
        case 'ADD_INGREDIENT':
            state.ingredients.push(action.ingredient)

            return {
                ...state,
            }
        case 'REMOVE_INGREDIENT':
            const index = state.ingredients.indexOf(action.ingredient);
            delete state.ingredients[index];

            return {
                ...state
            }
        default: 
            return state;
    }
}