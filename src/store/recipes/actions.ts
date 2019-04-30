import { RecipeActionTypes } from "./types";
import { IRecipe } from "../types";
import { ThunkAction } from "redux-thunk";
import axios from 'axios';

//#region Search

export function loadStart(): RecipeActionTypes{
    return {
        type: 'LOAD_START',
    }
}

export function loadSuccess(recipe: IRecipe) : RecipeActionTypes{
    return {
        recipe,
        type: 'LOAD_SUCCESS'
    }
}

export function loadFailure(error: string) : RecipeActionTypes{
    return {
        error,
        type: 'LOAD_FAILURE'
    }
}

export const loadRecipe = (recipeId: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    axios.post<IRecipe>(`https://api.feedmeapp.se/v2/recipe/retreive?id=${recipeId}`)
        .then(resp => {
            if(resp.status === 200){
                dispatch(loadSuccess(resp.data));
            } else{
                dispatch(loadFailure(resp.statusText));
            }
        })
        .catch(e => {
            dispatch(loadFailure(e));
        });
}

//#endregion
