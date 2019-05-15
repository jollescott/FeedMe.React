import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rootReducer } from './store';
import StartPage from './components/StartPage';
import NameSearchPage from './components/NameSearchPage';
import IngredientsSearchPage from './components/IngredientSearchPage';
import {SearchMode} from './misc/Enums';

const store = createStore(rootReducer, applyMiddleware(thunk));

interface IAppState{
  currentSearchMode: SearchMode,
}
class App extends React.Component<any, IAppState> {
  private slider: Slider | null;

  constructor(props: {}){
    super(props);

    this.slider = null;

    this.state = {
      currentSearchMode: SearchMode.Ingredients
    };
    
    this.changeSearchMode = this.changeSearchMode.bind(this);
  }

  public render(){
    const settings: SliderSettings = {
      dots: true,
      infinite: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      swipe: false,
      arrows: false,
    };

    const pages: any[] = [
      <StartPage currentSearchMode={this.state.currentSearchMode} changeSearchMode={this.changeSearchMode} key={0}/>,
    ];

    if (this.state.currentSearchMode === SearchMode.Ingredients){
      pages.push(<IngredientsSearchPage/>);
    }
    else {
      pages.push(<NameSearchPage/>);
    }

    return (
      <Provider store={store}>
        <div className="main">
          <Slider {...settings} ref={c => (this.slider = c)} className="slick-slider">
            {pages}
          </Slider>
        </div>
      </Provider>
    );
  }

  
  private changeSearchMode(searchMode: SearchMode): void {
    this.setState({
      currentSearchMode: searchMode
    })

    if(this.slider !== null) {
      this.slider.slickNext();
    }
  }

  private goBack(): void {
    if(this.slider !== null){
      this.slider.slickPrev();
    }
  }
};

export default App;
