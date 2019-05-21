import React from 'react';
import '../App.css';
import { SearchMode } from '../misc/enums';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { goForward, goBack, setMode } from '../store/carousel/actions';
import { Paper } from '@material-ui/core';


interface IStartProps {
  currentSearchMode: SearchMode;
  setMode: (mode: SearchMode) => void;
}
class StartPage extends React.Component<IStartProps> {
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
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderButton(searchMode: SearchMode, name: string) {
    return (
      <Button
        variant="contained"
        color={searchMode === this.props.currentSearchMode ? "primary" : "default"}
        onClick={() => this.nextPage(searchMode)}
        fullWidth={true}
        className="menuButton"
      >
        {name}
      </Button>
    );
  }

  private nextPage(searchMode: SearchMode): void {
    this.props.setMode(searchMode);
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    currentSearchMode: state.carousel.currentSearchMode
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    goForward: () => dispatch(goForward()),
    goBack: () => dispatch(goBack()),
    setMode: (mode: SearchMode) => dispatch(setMode(mode))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartPage);