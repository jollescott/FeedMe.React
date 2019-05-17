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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AddedIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import RemovedIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EndSearchIcon from '@material-ui/icons/Close';
import { searchRecipesI } from '../store/search/actions';
import { render } from 'react-dom';
import { returnStatement } from '@babel/types';


interface IIngredientSearchProps {
  results: IIngredient[];
  ingredients: IIngredient[];
  loading: boolean;
  error: string;
  findIngredients: (query: string) => void; // Börja söka efter ingredienser
  addIngredient: (ingredient: IIngredient) => void; // Lägg till ingrediens
  removeIngredient: (ingredient: IIngredient) => void; // Ta bort ingrediens
  findRecipes: (query: IIngredient[]) => void;  // Börja söka efter recept
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

    var isAdded: boolean[] = []; // En bool för varje ingrediens i "props.results" som anger om ingrediensen redan är tillagd i "props.ingreedients" eller inte.

    // Lägg till världen i isAdded[] och tilldela de resultatingredinser som redan är tillagada deras "roles"
    for (var i = 0; i < this.props.results.length; i++) {
      const index = this.ingredientListIndex(this.props.ingredients, this.props.results[i]);
      if (index !== -1) {
        this.props.results[i].role = this.props.ingredients[index].role;
      }
      isAdded.push(index !== -1);
    }

    var readyToFindRecipes = false; // Anger om det finns ingredienser som går att söka recept med.

    // Kolla om det finns ingredienser som går att söka recept med.
    for (var i = 0; i < this.props.ingredients.length; i++) {
      if (this.props.ingredients[i].role === 1) {
        readyToFindRecipes = true;
        break;
      }
    }

    return (
      <div className="page">

        {/* Header */}
        <div className="pageHeader">
          <div className="usablePage">
            <div className="slimDiv">
              <TextField
                fullWidth
                label="Lägg till ingredienser"
                type="search"
                variant="standard"
                onChange={this.textChanged}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>search</Icon>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" >
                      <Button variant="fab" disabled={this.state.searchTerm === ""} onClick={() => this.setState({ searchTerm: "" })} className="endSearchButton">
                        <EndSearchIcon color="default" />
                      </Button>
                    </InputAdornment>
                  )
                }}
              />

            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pageContent">
          <div className="usablePage">
            <div className="slimDiv">


              {this.state.searchTerm.length === 0 ?
                <h1 className="StartPageButtons">Tillagda ingredinser</h1>
                :
                <h1 className="StartPageButtons">Lägg till ingredienser</h1>
              }

              {this.state.searchTerm.length === 0 ?
                this.props.ingredients.length === 0 ?
                  <div>
                    <h3 className="info">Dina tillagda ingredienser kommer att visas här.</h3>
                    <h4 className="info"> Lägg till ingredienser genom att söka i sökfältet.</h4>
                  </div>
                  :
                  <List>
                    {this.props.ingredients.map((ingredient, index) => (
                      <ListItem key={index} className="ingredientListItem">
                        <ListItemText primary={ingredient.ingredientName} />
                        <IconButton onClick={() => this.toggleIngredientRole(this.props.ingredients, ingredient)}>
                          {ingredient.role ?
                            <AddedIcon color="primary" />
                            :
                            <RemovedIcon color="error" />
                          }
                        </IconButton>
                        <IconButton color="default" onClick={() => this.props.removeIngredient(ingredient)}>
                          <DeleteIcon color="default" />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                :
                !this.props.loading && this.props.results.length === 0 ?
                  <h3 className="info">{"Ingrediensen " + this.state.searchTerm + " kan inte hittas."}</h3>
                  :
                  <List>
                    {this.props.results.map((ingredient, index) => (
                      <ListItem key={index} className="ingredientListItem">
                        <ListItemText primary={this.formatListName(ingredient.ingredientName)} />

                        <IconButton color="default" onClick={() => this.toggleIngredient(ingredient, 0)} className="ingredientListButton">
                          {isAdded[index] && ingredient.role === 0 ? <RemovedIcon color="error" /> : <RemoveIcon color="default" />}
                        </IconButton>

                        <IconButton color="default" onClick={() => this.toggleIngredient(ingredient, 1)} className="ingredientListButton">
                          {isAdded[index] && ingredient.role === 1 ? <AddedIcon color="primary" /> : <AddIcon color="default" />}
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
              }

              <br />

              <Button variant="extendedFab" color="primary" onClick={this.nextPage} className="StartPageButtons" fullWidth disabled={!readyToFindRecipes}>
                Hämta Recept
              </Button>

              <div className="extraPageHeight"/>
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

  // Returerar indexen för en specifik ingrediens i en ingredienslissta
  private ingredientListIndex(ingredientList: IIngredient[], ingredient: IIngredient): number {
    for (var i = 0; i < ingredientList.length; i++) {
      if (ingredientList[i] != undefined && ingredientList[i].ingredientId === ingredient.ingredientId) {
        return i;
      }
    }
    return -1;
  }

  // Förkortar en sträng så att den inte blir överdrivet lång och förstör gränssnittet
  private formatListName(str: string): string {
    const stringLength: number = 50;
    if (str.length > stringLength) {
      str = str.substring(0, stringLength - 3);
      str += '...'
    }
    return str;
  }

  // Inverterar en ingrediens "role" och uppdaterar komponenten
  private toggleIngredientRole(ingredientList: IIngredient[], ingredient: IIngredient): void {
    const index = this.ingredientListIndex(ingredientList, ingredient);
    if (index !== -1) {
      ingredientList[index].role = Number(!Boolean(ingredientList[index].role));
      this.forceUpdate();
    }
  }

  // Tar bort, lägger till eller byter "role" på en ingrediens beroende på inparametrar
  private toggleIngredient(ingredient: IIngredient, role: number): void {
    const index = this.ingredientListIndex(this.props.ingredients, ingredient);

    if (index !== -1) { // Lägg till ingrediens eller byt role
      if (ingredient.role === role) { // Lägg till
        this.props.removeIngredient(ingredient);
      }
      else { // Byt role
        this.props.ingredients[index].role = role;
        this.forceUpdate();
      }
    }
    else { // Ta bort ingrediensen
      ingredient.role = role;
      this.props.addIngredient(ingredient);
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
