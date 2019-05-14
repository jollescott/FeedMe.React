import React from 'react';
import '../App.css';
import './StartPage.css';
import { SearchMode } from '../misc/Enums';
import Button from '@material-ui/core/Button';

interface IStartState {
  currentSearchMode: SearchMode;
  setSearchMode: any;
}
export default class StartPage extends React.Component<any, IStartState> {
  public render() {
    return (
      <div className="page">
        <h1>Sök recept med...</h1>
        {this.renderButton(SearchMode.Ingredients, 'Ingredienser')}
        {this.renderButton(SearchMode.Name, 'Recept Namn')}
      </div>
    );
  }

  private renderButton(searchMode: SearchMode, name: string) {
    const isActivated = searchMode === this.props.currentSearchMode;

    if (isActivated) {
      return ( 
        <Button variant="extendedFab" color="primary" onClick={() => this.props.setSearchMode(searchMode)}>
          {name}
        </Button>
      );
    }
    else {
      return ( 
        <Button variant="extendedFab" color="default">
          {name}
        </Button>
      )
    }
  }
}
