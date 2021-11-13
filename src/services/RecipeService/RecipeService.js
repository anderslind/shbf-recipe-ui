import call from '../../api/Api';
import {addInventoryFilters, addVitals} from "./RecipeServiceUtil";

function search(freeText, page, size, vitals, inventoryIds = '') {

    let queryStr = {
        query: freeText,
        page,
        size
    };

    queryStr = addVitals(queryStr, vitals)
    queryStr = addInventoryFilters(queryStr, inventoryIds);

    return call('search', {queryStr})
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('RecipeService Search-endpoint', err);
            throw err;
        });
}



function recipes(id) {
    return call(`recipes/${id}`)
        .then(data => {
            return data;
        })
        .catch(err => {
            console.error('RecipeService Recipes-endpoint', err);
            throw err;
        })
}

const def = {
    search,
    recipes
};
export default def;