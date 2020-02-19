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

const renderRecipe = recipe => {
    const element =
        `
        <li>
            <a class="results__link results__link--active" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
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