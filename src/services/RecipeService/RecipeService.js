import call from '../../api/Api';

function search(freeText, page, size, inventoryIds = '') {
    return call('search', {queryStr: {
            query: freeText,
            inventoryIds: inventoryIds,
            page,
            size
    }})
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