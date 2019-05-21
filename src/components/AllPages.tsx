import React from 'react';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import '../App.css';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rootReducer, AppState } from '../store';
import StartPage from '../components/StartPage';
import RecipeListPage from '../components/RecipeListPage';
import IngredientsSearchPage from '../components/IngredientSearchPage';
import NameSearchPage from '../components/NameSearchPage';
import RecipePage from '../components/RecipePage';
import { SearchMode } from '../misc/enums';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { goForward, goBack, goHome, setMode } from '../store/carousel/actions';
import { Paper, Button, IconButton } from '@material-ui/core';
import GoBackIcon from '@material-ui/icons/ArrowBackIos';
import { refreshRecipeCount } from '../store/recipes/actions';
import { searchClear } from '../store/search/actions';


const AppTheme = createMuiTheme({
  palette: {
    primary: { main: '#00CC66' }, // FeedMe grönt
    secondary: { main: '#909090' }, // grå
    error: {main: '#FF0000' }, // röd
  },
  typography: { useNextVariants: true },
});

interface IAllPagesProps {
  pageIndex: number;
  currentSearchMode: SearchMode;
  goForward: () => void;
  goBack: () => void;
  goHome: () => void;
  loadCount: () => void;
  setMode: (mode: SearchMode) => void;
  searchClear: () => void;
}
class AllPages extends React.Component<IAllPagesProps> {
  private slider: Slider | null;

  constructor(props: Readonly<IAllPagesProps>) {
    super(props);

    this.slider = null;

    this.state = {
      currentSearchMode: SearchMode.Ingredients
    };

    this.changeSearchMode = this.changeSearchMode.bind(this);
  }

  public componentDidMount(){
    this.props.loadCount();
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
      adaptiveHeight: false
    };

    // Pages to display in the Slider
    const pages: any[] = [
      <StartPage key={0} />,
    ];
    // Add pages
    if (this.props.currentSearchMode === SearchMode.Ingredients) {
      pages.push(<IngredientsSearchPage />);
      pages.push(<RecipeListPage />);
      pages.push(<RecipePage />);
    }
    else {
      pages.push(<NameSearchPage />);
      pages.push(<RecipePage />);
    }

    if (this.slider != null) {
      this.slider.slickGoTo(this.props.pageIndex, false);
    }

    if (this.props.pageIndex === 0){
      this.props.searchClear();
    }

    return (
      <MuiThemeProvider theme={AppTheme}>
        <div className="site">

          <div className="siteHeader">

            <Button color="default" onClick={this.props.goBack} disabled={this.props.pageIndex <= 0} className="headerBackButton">
              <GoBackIcon color="default" />
              Tillbaka
            </Button>

            <h1 className="headerMainText" onClick={this.props.goHome}>FeedMe</h1>

          </div>

          <div className="siteContent">
            <Slider {...settings} ref={c => (this.slider = c)} className="slick-slider">
              {pages}
            </Slider>
          </div>

          <div className="siteFooter"/>

        </div>
      </MuiThemeProvider>
    );
  }

  private changeSearchMode(searchMode: SearchMode): void {
    this.props.setMode(searchMode);
    this.props.goForward();
  }

  private goBack(): void {
    if (this.slider !== null) {
      this.slider.slickPrev();
    }
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    pageIndex: state.carousel.pageIndex,
    currentSearchMode: state.carousel.currentSearchMode
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    goForward: () => dispatch(goForward()),
    goBack: () => dispatch(goBack()),
    goHome: () => dispatch(goHome()),
    loadCount: () => dispatch(refreshRecipeCount()),
    setMode: (mode: SearchMode) => dispatch(setMode(mode)),
    searchClear: () => dispatch(searchClear()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllPages);



