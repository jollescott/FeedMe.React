import { ISearchState, SearchActionTypes } from "./types";

const initialState: ISearchState = {
    results: [],
}

export function searchReducer(state = initialState, action: SearchActionTypes) : ISearchState {
    switch(action.type){
        default: 
            return state;
    }
}