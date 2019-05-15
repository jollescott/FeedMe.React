import React from 'react';
import '../App.css';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { searchRecipesT } from '../store/search/actions';

interface INameSearchProps {
  search: (query: string) => void;
}
class StartPage extends React.Component<INameSearchProps> {

  public render() {
    return (
      <div className="page">
            <TextField id="input-with-icon-textfield" label="Sök ord"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon>search</Icon>
                    </InputAdornment>
                ),}}
            />

            <Button variant="extendedFab" color="primary">Sök</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    search: (query: string) => dispatch(searchRecipesT(query))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartPage);