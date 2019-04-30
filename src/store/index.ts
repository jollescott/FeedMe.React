import { combineReducers } from 'redux';
import { searchReducer } from './search/reducers'
import { ISearchState } from './search/types';
import { ingredientReducer } from './ingredients/reducers';
import { IIngredientState } from './ingredients/types';

export type AppState = ISearchState | IIngredientState;

export const rootReducer = combineReducers({
  search: searchReducer,
  ingredients: ingredientReducer
});
