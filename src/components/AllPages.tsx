import React from 'react';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import '../App.css';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rootReducer, AppState } from '../store';
import StartPage from '../components/StartPage';
import RecipeListPage from '../components/RecipeListPage';
import IngredientsSearchPage from '../components/IngredientSearchPage';
import NameSearchPage from '../components/NameSearchPage';
import { SearchMode } from '../misc/Enums';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const AppTheme = createMuiTheme({
  palette: {
    primary: { main: '#00CC66' }, // The FeedMe green
    secondary: { main: '#909090' }, // This is just grey
  },
  typography: { useNextVariants: true },
});

interface IAllPagesProps{
  pageIndex: number;
}

interface IAllPagesState {
  currentSearchMode: SearchMode,
}
class AllPages extends React.Component<any, IAllPagesState> {
  private slider: Slider | null;

  constructor(props: {}) {
    super(props);

    this.slider = null;

    this.state = {
      currentSearchMode: SearchMode.Ingredients
    };

    this.changeSearchMode = this.changeSearchMode.bind(this);
  }

  public render() {
    const settings: SliderSettings = {
      dots: true,
      infinite: false,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      swipe: false,
      arrows: false,
    };

    // Pages to display in the Slider
    const pages: any[] = [
      <StartPage currentSearchMode={this.state.currentSearchMode} changeSearchMode={this.changeSearchMode} key={0} />,
    ];
    // Add pages
    if (this.state.currentSearchMode === SearchMode.Ingredients) {
      pages.push(<IngredientsSearchPage/>);
      //pages.push(<RecipeListPage />);
    }
    else {
      pages.push(<NameSearchPage />);
    }

    return (
        <MuiThemeProvider theme={AppTheme}>
          <div className="main">
            <Slider {...settings} ref={c => (this.slider = c)} className="slick-slider">
              {pages}
            </Slider>
          </div>
        </MuiThemeProvider>
    );
  }


  private changeSearchMode(searchMode: SearchMode): void {
    this.setState({
      currentSearchMode: searchMode
    })

    if (this.slider !== null) {
      this.slider.slickNext();
    }
  }

  private goBack(): void {
    if (this.slider !== null) {
      this.slider.slickPrev();
    }
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    pageIndex: state.carousel.pageIndex
  };
};

export default connect(mapStateToProps)(AllPages);



