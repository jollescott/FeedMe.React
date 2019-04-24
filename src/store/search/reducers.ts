import { ISearchState, SearchActionTypes } from "./types";

const initialState: ISearchState = {
    error: '',
    loading: false,
    results: [],
}

export function searchReducer(state = initialState, action: SearchActionTypes) : ISearchState {
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
                results: state.results,
                loading: false
            }
        default: 
            return state;
    }
}