import React from 'react';
import '../App.css';
import { TextField, InputAdornment, Button, Paper, Card, CardMedia, Typography, CardContent, CardActionArea, CardActions } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { searchRecipesT, setQuery } from '../store/search/actions';
import { goForward, goBack } from '../store/carousel/actions';
import { IRecipe } from '../store/types';
import { loadRecipe } from '../store/recipes/actions';
import RecipeList from '../components/RecipeList';


interface INameSearchProps {
  results: IRecipe[];
  loading: boolean;
  error: string;
  goBack: () => void;
  goForward: () => void;
  findRecipes: (query: string) => void;
  openRecipe: (recipeId: string) => void;
  setQuery: (query: string) => void;
}
class NameSearchPage extends React.Component<
  INameSearchProps> {

  constructor(props: Readonly<INameSearchProps>) {
    super(props);

    this.textChanged = this.textChanged.bind(this);
    this.openRecipe = this.openRecipe.bind(this);
  }

  public render() {
    return (
      <div className="page">
        <div className="headedPageContainer">
          {/* Header */}
          <Paper className="pageHeader">
            <div className="usablePage">
              <div className="centerdDiv">
                <div className="slimDiv">
                  <TextField
                    fullWidth={true}
                    label="Skriv ett sökord"
                    type="search"
                    variant="standard"
                    onChange={this.textChanged}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>search</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </Paper>

          {/* Content */}
          <div className="pageContent">
            <div className="usablePage">
              <RecipeList />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private textChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    e.persist();

    this.props.setQuery(e.target.value);
    this.props.findRecipes(e.target.value);
  }

  private openRecipe(recipeId: string) {
    this.props.openRecipe(recipeId);
    this.props.goForward();
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    results: state.search.results,
    loading: state.search.loading,
    error: state.search.error,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    findRecipes: (query: string) => dispatch(searchRecipesT(query)),
    goForward: () => dispatch(goForward()),
    goBack: () => dispatch(goBack()),
    openRecipe: (recipeId: string) => dispatch(loadRecipe(recipeId)),
    setQuery: (query: string) => dispatch(setQuery(query))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameSearchPage);
