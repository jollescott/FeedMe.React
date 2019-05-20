import React from 'react';
import '../App.css';
import { IRecipe } from '../store/types';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { goBack } from '../store/carousel/actions';
import { Button, Card, CardMedia, CardContent, Typography, Divider } from '@material-ui/core';
import { isNumber } from 'util';

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
                        {this.renderRecipe()}
                    </div>

                    <div className="extraPageHeight"></div>
                </div>
            </div>
        );
    }

    private renderRecipe() {
        if (this.props.recipe !== undefined) {
            const recipe = this.props.recipe;
            return (
                <div>
                    <div>
                        <img src={recipe.image} />
                        <h1>{this.props.recipe.name}</h1>
                    </div>
                    <div className="doubleColumnContainer">
                        <div className="doubleColumnColumn">
                            <Card className="recipeInstructionCard">
                                <CardContent className="cardText">
                                    <Typography gutterBottom={true} variant="h6">
                                        Ingredienser
                                    </Typography>

                                    <div className="recipeIngredientListLeft">
                                        {recipe.recipeParts.map((recipePart, index) => (
                                            <div>
                                                <div className="recipeIngredientListRow">
                                                    <div className="recipeIngredientListLeftColumn">
                                                        <Typography component="p">
                                                            {recipePart.quantity + recipePart.unit}
                                                        </Typography>
                                                    </div>
                                                    <div className="recipeIngredientListRightColumn">
                                                        <Typography component="p">
                                                            {recipePart.ingredientName}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <Divider variant="fullWidth" />
                                            </div>
                                        ))}
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                        <div className="doubleColumnColumn">
                            {recipe.directions.map((direction, index) => (
                                <Card className="recipeInstructionCard">
                                    <CardContent className="cardText">
                                        <Typography gutterBottom={true} variant="h6">
                                            {"Steg " + (index + 1) + "."}
                                        </Typography>
                                        <Typography component="p">
                                            {this.formatRecipeDirection(direction)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <h1>Kunde inte hämta receptet</h1>
            );
        }
    }

    // Funktion som ser till att en receptinstruktion ser bra ut
    private formatRecipeDirection(direction: string): string {
        direction = direction.trim();
        // Tar bort receptinstruktionsnummer om det finns.
        while (this.stringIsNumber(direction[0])) {
            direction = direction.slice(1, direction.length - 1);
        }
        return direction;
    }

    // Returerar true om stringen är ett nummer
    private stringIsNumber(value: string): boolean {
        return ((value != null) && !isNaN(Number(value)));
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
