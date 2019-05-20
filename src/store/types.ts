export interface IRecipePart{
    ingredientName: string;

    recipeId: string;
    ingredientId: string;
    
    unit: string;
    quantity: number;
}

export interface IRecipeTag{
    tagId: number;
    name: string;
    previewImage: string;
}

export interface IRecipe{
    recipeID: string; //TODO: Change back to recipeId
    name: string;
    desc: string;
    source: string;
    owner: number;
    ownerLogo: string;
    image: string;
    coverage: number | undefined;

    ingredients: IIngredient[];
    directions: string[];
    recipeParts: IRecipePart[];
    tags: IRecipeTag[];
}

export enum IngredientRole{
    Include, Exclude
}

export interface IIngredient{
    ingredientId: number;
    role: IngredientRole;
    ingredientName: string;
}
