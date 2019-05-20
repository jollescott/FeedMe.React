import React from 'react';
import '../App.css';
import { TextField, InputAdornment, Button, Paper, Card, CardMedia, Typography, CardContent, CardActionArea, CardActions } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { searchRecipesT } from '../store/search/actions';
import { goForward, goBack } from '../store/carousel/actions';
import { IRecipe } from '../store/types';
import { loadRecipe } from '../store/recipes/actions';

interface INameSearchProps {
  results: IRecipe[];
  loading: boolean;
  error: string;
  goBack: () => void;
  goForward: () => void;
  findRecipes: (query: string) => void;
  openRecipe: (recipeId: string) => void;
}
interface INameSearchState {
  searchTerm: string;
}
class NameSearchPage extends React.Component<
  INameSearchProps,
  INameSearchState
> {

  constructor(props: Readonly<INameSearchProps>){
    super(props);

    this.textChanged = this.textChanged.bind(this);
    this.openRecipe = this.openRecipe.bind(this);

    this.state = {
      searchTerm: ''
    };
  }

  public render() {
    return (
      <div className="page">
        {/* Header */}
        <Paper className="pageHeader">
          <div className="usablePage">
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
        </Paper>

        {/* Content */}
        <div className="pageContent">
          <div className="usablePage">
            <div className="slimDiv">
              <Button
                variant="outlined"
                color="default"
                onClick={this.props.goBack}
              >
                {'< Föregående sida'}
              </Button>

              <div className="gridListContainer">
                {this.props.results.map((recipe, index) => (
                  <div className="gridListItemContainer" key={index}>
                    <Card className="gridListItem">
                      <CardActionArea onClick={() => this.openRecipe(recipe.recipeId)}>
                        <CardMedia
                          component="img"
                          image={recipe.image}
                          title={recipe.name} // TODO: byt title till receptets name
                        />
                        <CardContent>
                          <Typography gutterBottom={true} variant="h5" component="h2">
                            {recipe.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                      <CardActions>
                        <Button size="small" color="primary">
                          Recept.se
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="extraPageHeight" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private textChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    e.persist();

    this.setState({
      ...this.state,
      searchTerm: e.target.value,
    });

    this.props.findRecipes(e.target.value);
  }

  private openRecipe(recipeId: string){
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
    openRecipe: (recipeId: string) => dispatch(loadRecipe(recipeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameSearchPage);
