import React from 'react';
import '../App.css';
import { IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { goForward } from '../store/carousel/actions';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { refreshRecipeCount, loadRecipe } from '../store/recipes/actions';
import { SearchMode } from '../misc/enums';

interface IRecipeListProps {
  results: IRecipe[];
  loading: boolean;
  error: string;
  recipeCount: number;
  goForward: () => void;
  loadCount: () => void;
  openRecipe: (recipeId: string) => void;
  currentSearchMode: SearchMode;
}
class RecipeListPage extends React.Component<IRecipeListProps> {
  constructor(props: Readonly<IRecipeListProps>) {
    super(props);

    this.openRecipe = this.openRecipe.bind(this);

    this.state = {
      test: 'test',
    };
  }

  public render() {
    return (
      <div className="fullDiv">
        {this.props.loading ? (
          <div className="centerdDiv">
            <CircularProgress color="primary" className="loadingIndicator" />
            <h4>Letar bland {this.props.recipeCount} recept!</h4>
          </div>
        ) : (
          <div className="gridListContainer">
            {this.props.results.map((recipe, index) => (
              <div className="gridListItemContainer" key={index}>
                <Card className="gridListItem">
                  <CardActionArea
                    onClick={() => this.openRecipe(recipe.recipeId)}
                  >
                    <CardMedia
                      className="cardImage"
                      component="img"
                      image={recipe.image}
                      title={recipe.name}
                    />
                    <CardContent className="cardText">
                      <Typography
                        gutterBottom={true}
                        variant="h6"
                        noWrap={true}
                      >
                        {recipe.name}
                      </Typography>
                      <Typography component="p">
                        {this.coverageMessage(recipe)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}

            {this.props.results.length > 0 && (
              <div className="gridListItemContainer" key={-1}>
                <Card className="gridListItem">
                  <CardActionArea onClick={() => this.loadMore}>
                    <CardContent className="cardText">
                      <Typography
                        gutterBottom={true}
                        variant="h6"
                        noWrap={true}
                      >
                        Ladda fler.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  private coverageMessage(recipe: IRecipe): string {
    if (recipe.coverage === undefined) {
      return '';
    } else {
      return (
        'Du har ' +
        Math.round(recipe.coverage * 100) +
        '% av alla ingrediensser'
      );
    }
  }

  private loadMore() {

  }

  private openRecipe(recipeID: string) {
    this.props.openRecipe(recipeID);
    this.props.goForward();
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    results: state.search.results,
    loading: state.search.loading,
    error: state.search.error,
    recipeCount: state.recipes.recipeCount,
    currentSearchMode: state.carousel.currentSearchMode,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    goForward: () => dispatch(goForward()),
    loadCount: () => dispatch(refreshRecipeCount()),
    openRecipe: (recipeId: string) => dispatch(loadRecipe(recipeId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeListPage);
