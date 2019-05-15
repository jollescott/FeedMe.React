import React from 'react';
import '../App.css';
import { TextField, InputAdornment, Button, StepIcon } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { ThunkDispatch } from 'redux-thunk';
import { searchRecipesT, searchRecipesI } from '../store/search/actions';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { IIngredient } from '../store/types';
import { searchIngredients } from '../store/ingredients/actions';
import { AppState } from '../store';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddedIcon from '@material-ui/icons/PlaylistAddCheck';


interface IIngredientSearchProps {
  results: IIngredient[];
  ingredients: IIngredient[];
  loading: boolean;
  error: string;
  findIngredients: (query: string) => void;
}
class IngredientSearchPage extends React.Component<IIngredientSearchProps>
{
  constructor(props: Readonly<IIngredientSearchProps>) {
    super(props);

    this.textChanged = this.textChanged.bind(this);
  }

  public render() {
    // <Det här är bara temporärt för att se så att saker funkar>
    const checked: boolean[] = [];
    for (let i = 0; i < this.props.results.length; i++) {
      checked.push(i % 2 === 0);
    }
    // </...>

    return (
      <div className="page">
        <TextField
          label="Sök ingredienser"
          onChange={this.textChanged}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />

        <List>
          {this.props.results.map((ingredient, index) => (
            <ListItem key={index} role={undefined}>
              <ListItemText primary={ingredient.ingredientName} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments" color="primary" onClick={() => this.toggleIngredient(ingredient)}>
                  {checked[index] ? <AddIcon color="secondary"/> : <AddedIcon color="primary"/>}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }


  // Remove or ad an ingredient
  private toggleIngredient(ingredient: IIngredient): void{
    //this.props.addIngredient(ingredient);
  }

  // This gets called every time the search field updates
  private textChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    e.persist();
    // start searching for matching ingredients
    this.props.findIngredients(e.target.value);
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    results: state.ingredients.results,
    ingredients: state.ingredients.ingredients,
    loading: state.ingredients.loading,
    error: state.ingredients.error
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    findIngredients: (query: string) => dispatch(searchIngredients(query))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IngredientSearchPage);
