import React from 'react';
import '../App.css';
import { IIngredient, IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { searchRecipesI } from '../store/search/actions';
import { goForward, goBack } from '../store/carousel/actions';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { refreshRecipeCount, loadRecipe } from '../store/recipes/actions';

interface IRecipeListProps {
  results: IRecipe[];
  loading: boolean;
  error: string;
  recipeCount: number;
  findRecipes: (query: IIngredient[]) => void;
  goForward: () => void;
  goBack: () => void;
  loadCount: () => void;
  openRecipe: (recipeId: string) => void;
}
interface IRecipeListState {
  test: string;
}

class RecipeListPage extends React.Component<IRecipeListProps, IRecipeListState>
{
  constructor(props: Readonly<IRecipeListProps>) {
    super(props);

    this.state = ({
      test: "test"
    });
  }

  componentDidMount() {
    this.props.loadCount();
  }

  public render() {
    return (
      <Paper className="page">
        {/* Content */}
        <div className="pageContent">
          <div className="usablePage">
            <Button variant="outlined" color="default" onClick={this.props.goBack}>
              {"< Föregående sida"}
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

          </div>
        
          <div className="extraPageHeight"></div>
        </div>
      </Paper>
    );
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
    recipeCount: state.recipes.recipeCount,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    findRecipes: (query: IIngredient[]) => dispatch(searchRecipesI(query)),
    goForward: () => dispatch(goForward()),
    goBack: () => dispatch(goBack()),
    loadCount: () => dispatch(refreshRecipeCount()),
    openRecipe: (recipeId: string) => dispatch(loadRecipe(recipeId)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeListPage);
