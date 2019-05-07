import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rootReducer } from './store';

const store = createStore(rootReducer, applyMiddleware(thunk));


const App: React.FC = () => {
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
        <h2>Simple Slider</h2>
        <Slider {...settings} className="page">
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </Provider>
  );
};

export default App;
