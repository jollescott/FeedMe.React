import React from 'react';
import '../App.css';
import { IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { goBack } from '../store/carousel/actions';
import { Button } from '@material-ui/core';

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
                        {this.renderRecipe()}
                    </div>

                    <div className="extraPageHeight"></div>
                </div>
            </div>
        );
    }

    private renderRecipe() {
        if (this.props.recipe !== undefined) {
            return (
                <h1>{this.props.recipe.name}</h1>
            );
        }
        else {
            return (
                <h1>Hejj</h1>
            );
        }
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
