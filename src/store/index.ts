import { combineReducers } from 'redux';
import { searchReducer } from './search/reducers'
import { ISearchState } from './search/types';
import { ingredientReducer } from './ingredients/reducers';
import { IIngredientState } from './ingredients/types';
import { IRecipeState } from './recipes/types';
import { recipesReducer } from './recipes/reducers';

export const rootReducer = combineReducers({
  search: searchReducer,
  ingredients: ingredientReducer,
  recipes: recipesReducer
});

export type AppState = ReturnType<typeof rootReducer>

