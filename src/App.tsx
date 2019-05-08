import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rootReducer } from './store';
import StartPage from './components/StartPage';
import {SearchMode} from './misc/Enums';

const store = createStore(rootReducer, applyMiddleware(thunk));

interface IAppState{
  currentSearchMode: SearchMode,
}
class App extends React.Component<any, IAppState> {
  constructor(props: any){
    super(props);
    this.state = {
      currentSearchMode: SearchMode.Name
    };
  }

  public render(){
    const settings: SliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true, // true if on computer
    };

    return (
      <Provider store={store}>
        <div className="main">
          <Slider {...settings} className="pages">
          <StartPage currentSearchMode={this.state.currentSearchMode}/>
          <StartPage/>
          <StartPage/>
          </Slider>
        </div>
      </Provider>
    );
  }
};

export default App;
