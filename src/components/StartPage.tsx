import React from 'react';
import '../App.css';
import './StartPage.css';
import { SearchMode } from '../misc/Enums';
import Button from '@material-ui/core/Button';


interface IStartProps {
  currentSearchMode: SearchMode;
  changeSearchMode: (mode: SearchMode) => void;
}
export default class StartPage extends React.Component<IStartProps> {
  public render() {
    return (
      <div className="page">
        <h1 className="StartPageButtons">Sök recept med...</h1>
        {this.renderButton(SearchMode.Ingredients, 'Ingredienser')}
        {this.renderButton(SearchMode.Name, 'Recept Namn')}
      </div>
    );
  }

  private renderButton(searchMode: SearchMode, name: string) {
    const isActivated = searchMode === this.props.currentSearchMode;

    if (isActivated) {
      return ( 
// tslint:disable-next-line: jsx-no-lambda
        <Button variant="extendedFab" color="primary" onClick={() => this.props.changeSearchMode(searchMode)} className="StartPageButtons">
          {name}
        </Button>
      );
    }
    else {
      return ( 
// tslint:disable-next-line: jsx-no-lambda
        <Button variant="extendedFab" color="default" onClick={() => this.props.changeSearchMode(searchMode)} className="StartPageButtons">
          {name}
        </Button>
      )
    }
  }
}
