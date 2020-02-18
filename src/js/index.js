import Search from "./models/Search";

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
    const query = 'pizza'; //TODO

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for downloading data

        // 4. Searching for recipes and return a promise
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.result)
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    //to prevent refreshing page after clicked on button
    e.preventDefault();
    handleSearch().catch(error => alert(error));
});
