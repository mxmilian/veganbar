import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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

const handleList = () => {
    if(!state.list) state.list = new List();

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};


const handleLikes = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  if(!state.likes.isLiked(currentID)){
      const newLike = state.likes.addLike(
          currentID,
          state.recipe.title,
          state.recipe.publisher,
          state.recipe.imageUrl)
      ;
      likesView.toggleLikeBtn(true);
      likesView.renderLike(newLike);

  }else {
      state.likes.deleteLike(currentID);
      likesView.toggleLikeBtn(false);
      likesView.deleteLike(currentID);
  }
    console.log(state.likes.getNumLikes());
  likesView.toggleLikeMenu(state.likes.getNumLikes());

};


elements.shoppingList.addEventListener('click', e => {
    //Getting id from list
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

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
    } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        handleList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        handleLikes();
    }
});

//Restore like recipes on page load
window.addEventListener('load', () => {
    // Testing
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => likesView.renderLike(like));
});
