import React from 'react';
import '../App.css';
import { TextField, InputAdornment } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { IIngredient } from '../store/types';
import { searchIngredients, addIngredient, removeIngredient } from '../store/ingredients/actions';
import { AppState } from '../store';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddedIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteIcon from '@material-ui/icons/Delete';
import { searchRecipesI } from '../store/search/actions';
import { render } from 'react-dom';


interface IIngredientSearchProps {
  results: IIngredient[];
  ingredients: IIngredient[];
  loading: boolean;
  error: string;
  findIngredients: (query: string) => void; // Börja söka efter ingredienser
  addIngredient: (ingredient: IIngredient) => void; // Lägg till ingrediens
  removeIngredient: (ingredient: IIngredient) => void; // Ta bort ingrediens
  findRecipes: (query: IIngredient[]) => void;
}
interface IIngredientSearchState {
  searchTerm: string;
}
class IngredientSearchPage extends React.Component<IIngredientSearchProps, IIngredientSearchState>
{

  constructor(props: Readonly<IIngredientSearchProps>) {
    super(props);

    this.state = {
      searchTerm: ''
    }

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
        <div className="usablePage">
          <div className="paddedPage">
            <div className="slimDiv">
              <TextField
                fullWidth
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

              {"debug: Results: " + this.props.results.length + " Ingredients: " + this.props.ingredients.length}

              {this.state.searchTerm.length === 0 ?
                <List>
                  {this.props.ingredients.map((ingredient, index) => (
                    <ListItem key={index} role={undefined}>
                      <ListItemText primary={this.formatListName(String(ingredient))} />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" color="primary" onClick={() => this.props.removeIngredient(ingredient)}>
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                :
                <List>
                  {this.props.results.map((ingredient, index) => (
                    <ListItem key={index} role={undefined} className="ingredientListItem">
                      <ListItemText primary={this.formatListName(ingredient.ingredientName)} />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" color="primary" onClick={() => this.toggleIngredient(ingredient)} className="ingredientListButton">
                          {checked[index] ? <AddIcon color="secondary" /> : <AddedIcon color="primary" />}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Förkortar strängen så att den inte blir överdrivet lång
  private formatListName(str: string): string {
    const stringLength: number = 30;
    if (str.length > stringLength) {
      str = str.substring(0, stringLength - 3);
      str += '...'
    }
    return str;
  }


  // Tar bort ingrediensen om den redan existerar annars så läggs den till
  private toggleIngredient(ingredient: IIngredient): void {
    // TODO: det som står i komentaren över
    this.props.addIngredient(ingredient);
  }

  // Körs när texten i sökbaren ändras
  private textChanged(e: React.ChangeEvent<HTMLInputElement>): void {
    e.persist();

    this.setState({
      ...this.state,
      searchTerm: e.target.value
    })
    // börja söka efter matchande ingredienser
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
    findIngredients: (query: string) => dispatch(searchIngredients(query)),
    addIngredient: (ingredient: IIngredient) => dispatch(addIngredient(ingredient)), //Lägg till dispatchen för injection in i props
    removeIngredient: (ingredient: IIngredient) => dispatch(removeIngredient(ingredient)), //Lägg till dispatchen för injection in i props
    findRecipes: (query: IIngredient[]) => dispatch(searchRecipesI(query))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IngredientSearchPage);
