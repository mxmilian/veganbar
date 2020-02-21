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

    calcServings() {
        this.servings = 4;
    }

    //this function will transform the api data we will use
    parseIngredients() {
        //This is new array of api array elements
        const newIngredients = this.ingredients.map(ing => {
            const apiUnits = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
            const newUnits = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
            const units = [...newUnits, 'kg', 'g'];

            let newIng;
            // Standardize units
            newIng = ing.toLowerCase();
            //If in newIng array is some unit from apiUnits then replace this to unit from outUnits on this same place for example ounces(2) -> oz(2)
            apiUnits.forEach((unit, index)=>{
                newIng = newIng.replace(unit, newUnits[index]);
            });

            // Remove text in parentheses and them
            newIng = newIng.replace(/ *\([^)]*\) */g, '');

            // Parse ingredients into count, unit and ingredient (separate counts, units, and ingredients)
            //If is here unit and what is its index
            const arrIngredient = newIng.split(' ');
            const unitIndex = arrIngredient.findIndex(element => units.includes(element));

            let objectIngredient;
            if (unitIndex > -1) {
                //There is a unit
                //arrCount Ex. 4 1/2 cups, arrCount is [4, 1/2]
                //arrCount Ex. 4 cups, arrCount is [4]
                const arrCount = arrIngredient.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1) {
                    if(arrCount[0] !== '') {
                        count = eval(arrIngredient[0].replace('-', '+'));
                    } else {
                        count = 1;
                    }
                } else {
                    count = eval(arrIngredient.slice(0, unitIndex).join('+'));
                }

                objectIngredient = {
                    count,
                    unit: arrIngredient[unitIndex],
                    ingredient: arrIngredient.slice(unitIndex + 1).join(' '),
                }
            } else if (parseInt(arrIngredient[0], 10)){
                //There is no unit but 1st element is a number
                objectIngredient = {
                    count: parseInt(arrIngredient[0], 10),
                    unit: '',
                    ingredient: arrIngredient.slice(1).join(' '),
                }
            } else if (unitIndex === -1) {
                //There is no unit and 1sr element is no a number
                objectIngredient = {
                    count: 1,
                    unit: '',
                    ingredient: newIng,
                }
            }

            return objectIngredient;
        });
        this.ingredients = newIngredients;
    }
}

export default Recipe;