export const elements = {
    searchBtn: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
};

export const loading = parent => {
    const loader =
        `
        <div class="loader">
            <div class="lds-heart">
                <div></div>
            </div>
        </div>
        `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const removeLoading = () => {
    const loader = document.querySelector('.loader');
    if(loader) loader.parentElement.removeChild(loader);
};