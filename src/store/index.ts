import { combineReducers } from 'redux';
import { searchReducer } from './search/reducers'

const rootReducer = combineReducers({
  search: searchReducer,
});

export type AppState = ReturnType<typeof rootReducer>