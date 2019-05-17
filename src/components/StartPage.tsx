import React from 'react';
import '../App.css';
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

        <div className="pageContent">
          <div className="usablePage">
            <div className="slimDiv">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1 className="centerText">Sök recept med...</h1>
              <br />
              <br />
              {this.renderButton(SearchMode.Ingredients, 'Ingredienser')}
              <br />
              <br />
              {this.renderButton(SearchMode.Name, 'Recept Namn')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderButton(searchMode: SearchMode, name: string) {
    const isActivated = searchMode === this.props.currentSearchMode;

    if (isActivated) {
      return (
        // tslint:disable-next-line: jsx-no-lambda
        <Button variant="contained" color="primary" onClick={() => this.props.changeSearchMode(searchMode)} fullWidth>
          {name}
        </Button>
      );
    }
    else {
      return (
        // tslint:disable-next-line: jsx-no-lambda
        <Button variant="contained" color="default" onClick={() => this.props.changeSearchMode(searchMode)} fullWidth>
          {name}
        </Button>
      )
    }
  }
}
