import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import {elements, loading, removeLoading} from "./views/base";

/* Global state of the app
*  - Search objects
*   - Current recipe object
*  - Shopping list object
*  - Liked recipes
* */
const state = {
};
console.log(state);
const handleSearch = async () => {
    console.log(`1: ${state}`);

    // 1. Get query from the view (user input)
    const query = searchView.searchInput();

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
            console.log(state);
        } catch (e) {
            console.log(e);
            alert('Something went wrong!');
        }
    }
    console.log(state);
};

elements.searchBtn.addEventListener('submit', e => {
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

        //Create new recipe object
        state.recipe = new Recipe(id);
        try {
            //Get recipe data
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);

            //Calculate all things
            state.recipe.calcTime();
            console.log(state.recipe.time);

            //Render recipe
            console.log(state.recipe);
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