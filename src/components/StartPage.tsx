import React from 'react';
import '../App.css';
import './StartPage.css';
import {SearchMode} from '../misc/Enums';
import  Button from '@material-ui/core/Button';

interface IStartState{
  currentSearchMode: SearchMode,
}
export default class StartPage extends React.Component<any, IStartState> {

  public render() {
    return (
      <div className="page">
        <h1>Sök recept med...</h1>  
        {this.renderButton(0, 'Ingredienser')}
        {this.renderButton(1, 'Recept Namn')}
      </div>
      );
  }

  private renderButton(id: number, name: string){

    return(
      <Button variant="outlined" color="inherit">
        {name}
      </Button>
    );
  }
}
