import {elements} from "./base";

export const searchInput = () => {
  return elements.searchInput.value;
};

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
   const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
   document.querySelector(`a[href*="#${id}"]`).classList.add('results__link--active');
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

// type: 'prev' or 'next'
const createButon = (page, type) =>
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page +1}>
        <span>Page ${type === 'prev' ? page -1 : page +1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;

const renderRecipe = recipe => {
    const element =
        `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
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

const renderButtons = (page, numOfRes, resPerPage) => {
    //45 / 10 4.5 but we need 5 pages
    const pages = Math.ceil(numOfRes / resPerPage);
    let button;
    if (page === 1) {
        // Button to go next page
        button = createButon(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `   
            ${createButon(page, 'next')}
            ${createButon(page, 'prev')}
                `;
    } else if (page === pages) {
        // Button to go prev page
        button = createButon(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const gotRecipes = (recipes, page = 1, resPerPage = 8) => {
    //This is the same like
    // recipes.forEach(recipe => {
    //     renderRecipe(recipe)
    // });
    //recipes.forEach(renderRecipe);
    //  implementing pagination render result current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination
    renderButtons(page, recipes.length, resPerPage);
};