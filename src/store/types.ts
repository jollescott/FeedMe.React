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
    recipeId: number;
    name: string;
    desc: string;
    source: string;
    owner: number;
    ownerLogo: string;
    image: string;

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
