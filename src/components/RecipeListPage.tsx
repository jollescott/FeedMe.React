import React from 'react';
import '../App.css';
import { IIngredient, IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';

interface IRecipeListProps {
  ingredients: IIngredient[];

  results: IRecipe[];
  loading: boolean;
  error: string

  findRecipes: (query: IIngredient[]) => void;  // Börja söka efter recept
}
interface IRecipeListState {

}

class RecipeListPage extends React.Component<IRecipeListProps, IRecipeListState>
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
