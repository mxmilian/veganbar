import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, loading, removeLoading} from "./views/base";

/* Global state of the app
*  - Search objects
*   - Current recipe object
*  - Shopping list object
*  - Liked recipes
* */
const state = {
};

const handleSearch = async () => {

    // 1. Get query from the view (user input)

    //TESTING
    //const query = searchView.searchInput();
    const query = 'pizza';

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for downloading data
        searchView.clearInput();
        searchView.clearResults();
        loading(elements.searchResList);

        try {
            // 4. Searching for recipes and return a promise
            await state.search.getResults();

            // 5. Render results on UI
            removeLoading();
            searchView.gotRecipes(state.search.result);

        } catch (e) {
            console.log(e);
            alert('Something went wrong!');
            removeLoading();
        }
    }
};

elements.searchBtn.addEventListener('submit', e => {
    //to prevent refreshing page after clicked on button
    e.preventDefault();
    handleSearch().catch(error => alert(error));
});


//For faster TESTING
window.addEventListener('load', e => {
    //to prevent refreshing page after clicked on button
    e.preventDefault();
    handleSearch().catch(error => alert(error));
});

elements.searchResPages.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   if(btn) {
       searchView.clearResults();
       const goToPage = parseInt(btn.dataset.goto, 10);
       searchView.gotRecipes(state.search.result, goToPage);
   }
});

//Recipe controller
const handleRecipe = async () => {
    //Get id from url
    const id = window.location.hash.replace('#', '');
    if(id) {

        //Prepare UI for changes
        recipeView.clearRecipe();
        loading(elements.recipePage);

        //Highlight selected element
        if (state.search) searchView.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);
        //Include state.recipe to window object to get access
        window.recipe = state.recipe;

        try {
            //Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculate all things
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            recipeView.renderRecipe(state.recipe);
            removeLoading();
        } catch (e) {
            console.log(e);
            alert('Something gone wrong!');
        }
    }
};

/*
window.addEventListener('hashchange', handleRecipe);
window.addEventListener('load', handleRecipe);
*/

//hashchange reacts when the hash in url is changing, load react when the site is reloading
['hashchange', 'load'].forEach(event => window.addEventListener(event, handleRecipe));

//update servings handle
elements.recipePage.addEventListener('click', e => {
    if (e.target.matches('.btn-increase, .btn-increase *')) {
        if(state.recipe.servings > 0) {
            state.recipe.updateServings('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe)
});