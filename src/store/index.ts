import { combineReducers } from 'redux';
import { searchReducer } from './search/reducers'
import { ISearchState } from './search/types';
import { ingredientReducer } from './ingredients/reducers';
import { IIngredientState } from './ingredients/types';
import { IRecipeState } from './recipes/types';

export type AppState = ISearchState | IIngredientState | IRecipeState;

export const rootReducer = combineReducers({
  search: searchReducer,
  ingredients: ingredientReducer
});
