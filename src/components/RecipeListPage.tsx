import React from 'react';
import '../App.css';
import { IIngredient, IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { searchRecipesI } from '../store/search/actions';
import { goForward, goBack } from '../store/carousel/actions';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { refreshRecipeCount } from '../store/recipes/actions';

interface IRecipeListProps {
  results: IRecipe[];
  loading: boolean;
  error: string;
  recipeCount: number;
  findRecipes: (query: IIngredient[]) => void;
  goForward: () => void;
  goBack: () => void;
  loadCount: () => void;
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
      <div className="page">
        {/* Content */}
        <div className="pageContent">
          <div className="usablePage">
            <Button variant="outlined" color="default" onClick={this.props.goBack}>
              {"< Föregående sida"}
            </Button>

            <br />
            {"Recipe count: " + this.props.recipeCount}
            <br />
            {"Loading: " + this.props.loading}
            <br />
            {"Error: " + this.props.error}
            <br />
            {"Error är null: " + String(this.props.error === null)}
            <br />
            {"Antal recpt: " + this.props.results.length}

            <List>
              {this.props.results.map((recipe, index) => (
                <ListItem key={index} className="ingredientListItem">
                  <ListItemText primary={recipe.recipeId} />
                </ListItem>
              ))}
            </List>

            <div className="gridListContainer">
              {["test", "test", "test", "test", "test", "test", "test", "test"].map((test, index) => (
                <div className="gridListItemContainer">
                  <Card className="gridListItem">

                    <CardActionArea onClick={this.props.goForward}>
                      <CardMedia
                        component="img"
                        image="https://www.kungsornen.se/Global/Recept/saffranspasta-med-sparris.jpg"
                        title="Recept"  // TODO: byt title till receptets namn
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">Recept namn</Typography>
                        <Typography component="p">Du har 87% av alla ingredienser</Typography>
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
      </div>
    );
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
    loadCount: () => dispatch(refreshRecipeCount())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeListPage);
