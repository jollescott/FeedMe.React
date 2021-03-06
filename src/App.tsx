import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import { rootReducer } from './store';
import AllPages from './components/AllPages';
import { SearchMode } from './misc/enums';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-146469825-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const store = createStore(rootReducer, applyMiddleware(thunk));

interface IAppState {
  currentSearchMode: SearchMode,
}
class App extends React.Component<any, IAppState> {

  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <Provider store={store}>
          <AllPages />
      </Provider>
    );
  }

};

export default App;