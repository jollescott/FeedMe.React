import { IIngredientState, IngredientActionTypes } from "./types";
import { IIngredient } from "../types";

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
            const aIngredients = new Array<IIngredient>(...state.ingredients);
            aIngredients.push(action.ingredient);

            return {
                ...state,
                ingredients: aIngredients
            }
        case 'REMOVE_INGREDIENT':
            const rIngredients = new Array<IIngredient>(...state.ingredients);
            const index = rIngredients.indexOf(action.ingredient);
            delete rIngredients[index];

            return {
                ...state,
                ingredients: rIngredients
            }
        default: 
            return state;
    }
}