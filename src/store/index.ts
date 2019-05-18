import { combineReducers } from 'redux';
import { searchReducer } from './search/reducers'
import { ingredientReducer } from './ingredients/reducers';
import { recipesReducer } from './recipes/reducers';

export const rootReducer = combineReducers({
  search: searchReducer,
  ingredients: ingredientReducer,
  recipes: recipesReducer
});

export type AppState = ReturnType<typeof rootReducer>

