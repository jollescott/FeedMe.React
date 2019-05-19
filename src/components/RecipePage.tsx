import React from 'react';
import '../App.css';
import { IIngredient, IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { searchRecipesI } from '../store/search/actions';
import { goForward, goBack } from '../store/carousel/actions';
import { Button, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { refreshRecipeCount } from '../store/recipes/actions';

interface IRecipeProps {
    recipe: IRecipe | undefined;
    error: string;
    loading: boolean;
    goBack: () => void;
}
interface IRecipeState {
    test: string;
}

class RecipePage extends React.Component<IRecipeProps, IRecipeState>
{
    constructor(props: Readonly<IRecipeProps>) {
        super(props);

        this.state = ({
            test: "test"
        });
    }

    public render() {
        return (
            <div className="page">
                {/* Content */}
                <div className="pageContent">
                    <div className="usablePage">
                        <Button variant="outlined" color="default" onClick={this.props.goBack}>
                            {"< Föregående sida"}
                        </Button>
                    </div>

                    <div className="extraPageHeight"></div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: AppState) => {
    return {
        recipe: state.recipes.recipe,
        error: state.recipes.error,
        loading: state.recipes.loading,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        goBack: () => dispatch(goBack()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RecipePage);
