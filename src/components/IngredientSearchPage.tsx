import React from 'react';
import '../App.css';
import './IngredientSearchPage.css';
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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddedIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteIcon from '@material-ui/icons/Delete';
import EndSearchIcon from '@material-ui/icons/Close';
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
        <div className="pageHeader">
          <div className="usablePage">
            <div className="slimDiv">
              <TextField
                className="searchBar"
                //fullWidth
                label="Lägg till ingredienser"
                onChange={this.textChanged}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>search</Icon>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton aria-label="Comments" color="primary" onClick={() => this.setState({ searchTerm: "" })} className="endSearchButton">
                <EndSearchIcon color="secondary" />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="pageContent">
          <div className="usablePage">
            <div className="slimDiv">


              {this.state.searchTerm.length === 0 ?
                <h1 className="StartPageButtons">Valda ingredinser:</h1>
                :
                <h1 className="StartPageButtons">Lägg till en ingrediens</h1>
              }

              {this.state.searchTerm.length === 0 ?
                this.props.ingredients.length === 0 ?
                  <div>
                    <h3 className="info">Dina tillagda ingredienser kommer att visas här.</h3>
                    <h4 className="info"> Lägg till ingredienser genom at söka i sökgältet.</h4>
                  </div>
                  :
                  <List>
                    {this.props.ingredients.map((ingredient, index) => (
                      <ListItem key={index} className="ingredientListItem">
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
                    <ListItem key={index} className="ingredientListItem">
                      <ListItemText primary={this.formatListName(ingredient.ingredientName)} />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Comments" color="primary" onClick={() => this.toggleIngredient(ingredient)} className="ingredientListButton">
                          {this.ingredientExistsInList(this.props.ingredients, ingredient) ? <AddedIcon color="primary" /> : <AddIcon color="secondary" />}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              }

              <br />

              {this.props.ingredients.length === 0 ?
              <Button variant="extendedFab" color="primary" fullWidth disabled>
                Hämta Recept
              </Button>
              :
              <Button variant="extendedFab" color="primary" onClick={this.nextPage} className="StartPageButtons" fullWidth>
                Hämta Recept
              </Button>
              }
              <br />
              <br />
              {"debug: Results: " + this.props.results.length + ", Ingredients: " + this.props.ingredients.length}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Gå till nästa sida
  private nextPage(): void {
  }

  // Kollar om en ingredienslista innehåller en specifik ingrediens
  private ingredientExistsInList(ingredientList: IIngredient[], ingredient: IIngredient): boolean {
    for (var i = 0; i < ingredientList.length; i++) {
      if (ingredientList[i] != undefined && ingredientList[i].ingredientId === ingredient.ingredientId) {
        return true;
      }
    }
    return false;
  }

  // Förkortar en sträng så att den inte blir överdrivet lång och förstör gränssnittet
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
    if (this.ingredientExistsInList(this.props.ingredients, ingredient)) {
      this.props.removeIngredient(ingredient);
      alert("remove " + ingredient.ingredientName)
    }
    else {
      this.props.addIngredient(ingredient);
      alert("add " + ingredient.ingredientName)
    }
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
