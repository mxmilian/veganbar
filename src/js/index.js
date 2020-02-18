import axios from 'axios';

async function getResults(query) {
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
        for ( let i =0; i< res.data.count; i++) {
            console.log(res.data.recipes[i]);
        }
    } catch (e) {
        alert(e);
    }
}
let query = prompt('What kind of recipe are you looking?');
getResults(query);