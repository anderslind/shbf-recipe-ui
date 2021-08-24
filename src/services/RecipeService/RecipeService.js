import call from '../../api/Api';

function search(freeText, page, size) {
    return call('search', {queryStr: {
            query: freeText,
            page,
            size
    }})
        .then(data => {
            console.log('RecipeService', data)
            return data;
        })
        .catch(err => {
            console.error('RecipeService', err);
            throw err;
        });
}


const def = {
    search,
};
export default def;