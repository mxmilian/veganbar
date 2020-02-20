import axios from 'axios';

class Recipe {
    //To the constructor go attributes just from calling method
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.publisher = res.data.recipe.publisher;
            this.ingredients = res.data.recipe.ingredients;
            this.sourceUrl = res.data.recipe.source_url;
            this.recipeId = res.data.recipe.recipe_id;
            this.imageUrl = res.data.recipe.image_url;
            this.socialRank = res.data.recipe.social_rank;
            this.publisherUrl = res.data.recipe.publisher_url;
        } catch (e) {
            console.log(e);
            alert('Something went wrong!')
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3) ;
        this.time = periods * 15;
    }
}

export default Recipe;