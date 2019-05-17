import React from 'react';
import '../App.css';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { IIngredient, IRecipe } from '../store/types';
import { searchIngredients, addIngredient, removeIngredient } from '../store/ingredients/actions';
import { AppState } from '../store';
import { searchRecipesI } from '../store/search/actions';
import { render } from 'react-dom';
import { returnStatement } from '@babel/types';


interface IRecipeListProps {
  ingredients: IIngredient[];

  results: IRecipe[];
  loading: boolean;
  error: string

  findRecipes: (query: IIngredient[]) => void;  // Börja söka efter recept
}

class RecipeListPage extends React.Component<IRecipeListProps>
{
  constructor(props: Readonly<IRecipeListProps>) {
    super(props);
  }

  public render() {
    return (
      <div className="page">

       
        {/* Content */}
        <div className="pageContent">
          
        </div>

      </div>
    );
  }

  // Gå till nästa sida
  private nextPage(): void {
  }

 
const mapStateToProps = (state: AppState) => {
  return {
    results: state.search.results,
    loading: state.search.loading,
    error: state.search.error,

    recipeCount: state.recipes.recipeCount,
  };
};


export default connect(
  mapStateToProps,
)(RecipeListPage);
