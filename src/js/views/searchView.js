import {elements} from "./base";

export const searchInput = () => {
  return elements.searchInput.value;
};

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};
/*
//    0    1     2    3     4
//'Pasta with tomato and spinach'
array length 5
                   5
acc: 0 / acc + cur.length = 5 newTitle =['Pasta'],
                   4
acc: 5 / acc + cur.length = 9 newTitle =['Pasta', with],
                   6
acc: 9 / acc + cur.length = 15 newTitle =['Pasta', 'with', 'tomato'],
                   3
acc: 15 / acc + cur.length = 18 newTitle =['Pasta', 'with', 'tomato'],
acc: 18 / acc + cur.length = 18 newTitle =['Pasta', 'with', 'tomato'],
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= 17) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`
    }
    return title;
};

const renderRecipe = recipe => {
    const element =
        `
        <li>
            <a class="results__link results__link--active" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
    elements.searchResList.insertAdjacentHTML('beforeend', element);
};

export const gotRecipes = recipes => {
    //This is the same like
    // recipes.forEach(recipe => {
    //     renderRecipe(recipe)
    // });
    recipes.forEach(renderRecipe);
};