import { IRecipe, SearchActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "..";
import axios from 'axios';
import { Action } from "redux";

export function searchStart(): SearchActionTypes{
    return {
        type: 'SEARCH_START',
    }
}

export function searchSuccess(recipes: IRecipe[]) : SearchActionTypes{
    return {
        recipes,
        type: 'SEARCH_SUCCESS'
    }
}

export function searchFailure(error: string) : SearchActionTypes{
    return {
        error,
        type: 'SEARCH_FAILURE'
    }
}

export const searchRecipes = (searchTerm: string): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    axios.post<IRecipe[]>(`https://api.feedmeapp.se/v2/recipe/text?search=${searchTerm}`)
        .then(resp => {
            if(resp.status === 200){
                dispatch(searchSuccess(resp.data));
            } else{
                dispatch(searchFailure(resp.statusText));
            }
        })
        .catch(e => {
            dispatch(searchFailure(e));
        });
}
