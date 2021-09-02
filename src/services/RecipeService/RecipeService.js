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
            console.error('RecipeService', err);
            throw err;
        });
}

const def = {
    search
};
export default def;