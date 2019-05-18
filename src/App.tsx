import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rootReducer } from './store';
import NameSearchPage from './components/NameSearchPage';
import { SearchMode } from './misc/Enums';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AllPages from './components/AllPages';

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





// import React from 'react';
// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import './App.css';
// import Slider, { Settings as SliderSettings } from 'react-slick';
// import { rootReducer } from './store';
// import StartPage from './components/StartPage';
// import RecipeListPage from './components/RecipeListPage';
// import IngredientsSearchPage from './components/IngredientSearchPage';
// import NameSearchPage from './components/NameSearchPage';
// import { SearchMode } from './misc/Enums';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// const AppTheme = createMuiTheme({
//   palette: {
//     primary: { main: '#00CC66' }, // The FeedMe green
//     secondary: { main: '#909090' }, // This is just grey
//   },
//   typography: { useNextVariants: true },
// });



// interface IAppState {
//   currentSearchMode: SearchMode,
// }
// class App extends React.Component<any, IAppState> {
//   private slider: Slider | null;

//   constructor(props: {}) {
//     super(props);

//     this.slider = null;

//     this.state = {
//       currentSearchMode: SearchMode.Ingredients
//     };

//     this.changeSearchMode = this.changeSearchMode.bind(this);
//   }

//   public render() {
//     const settings: SliderSettings = {
//       dots: true,
//       infinite: false,
//       speed: 700,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       draggable: false,
//       swipe: false,
//       arrows: false,
//     };

//     // Pages to display in the Slider
//     const pages: any[] = [
//       <StartPage currentSearchMode={this.state.currentSearchMode} changeSearchMode={this.changeSearchMode} key={0} />,
//     ];
//     // Add pages
//     if (this.state.currentSearchMode === SearchMode.Ingredients) {
//       pages.push(<IngredientsSearchPage />);
//       //pages.push(<RecipeListPage />);
//     }
//     else {
//       pages.push(<NameSearchPage />);
//     }

//     return (
//       <Provider store={store}>
//         <MuiThemeProvider theme={AppTheme}>
//           <div className="main">
//             <Slider {...settings} ref={c => (this.slider = c)} className="slick-slider">
//               {pages}
//             </Slider>
//           </div>
//         </MuiThemeProvider>
//       </Provider>
//     );
//   }


//   private changeSearchMode(searchMode: SearchMode): void {
//     this.setState({
//       currentSearchMode: searchMode
//     })

//     if (this.slider !== null) {
//       this.slider.slickNext();
//     }
//   }

//   private goBack(): void {
//     if (this.slider !== null) {
//       this.slider.slickPrev();
//     }
//   }
// };

// export default App;
