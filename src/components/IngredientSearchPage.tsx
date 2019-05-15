import React from 'react';
import '../App.css';
import { TextField, InputAdornment, Button } from '@material-ui/core';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

interface IIngredientSearchProps{
  results: IIngredient[];
  ingredients: IIngredient[];
  loading: boolean;
  error: string;
  findIngredients: (query: string) => void; 
}
class IngredientSearchPage extends React.Component<IIngredientSearchProps>
{
  constructor(props: Readonly<IIngredientSearchProps>){
    super(props);

    this.textChanged = this.textChanged.bind(this);
  }

  public render() {

    const resultStrings: string[] = [];
    for(let i = 0; i < this.props.results.length; i++){
      resultStrings.push(this.props.results[i].ingredientName);
    }

    const checked: boolean[] = [];
    for(let i = 0; i < this.props.results.length; i++){
      checked.push(i % 2 === 0);
    }

    return (
      <div className="page">
      {"loading: " + this.props.loading}
      {"error: " + this.props.error}
        <TextField
          id="input-with-icon-textfield"
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
        {resultStrings}

        <List>
          {[0, 1, 2, 3].map(value => (
            <ListItem key={value} role={undefined} dense button onClick={() => alert(value)}>
              <Checkbox
                checked={checked[value]}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

      </div>
    );
  }

  private textChanged(e: React.ChangeEvent<HTMLInputElement>): void{
    e.persist();
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
