import call from '../../api/Api';
import {addInventoryFilters, addVitals} from "./RecipeServiceUtil";
import {useRecoilState} from "recoil";
import {demo} from "../../state";
import RecipeServiceMock from "./RecipeServiceMock";

function search(freeText, page, size, vitals, inventoryIds = '', demoMode = false) {

    let queryStr = {
        query: freeText,
        page,
        size
    };

    queryStr = addVitals(queryStr, vitals)
    queryStr = addInventoryFilters(queryStr, inventoryIds);

    if (!demoMode) {
        return call('search', {queryStr})
            .then(data => {
                return data;
            })
            .catch(err => {
                console.error('RecipeService Search-endpoint', err);
                throw err;
            });
    } else {
        return RecipeServiceMock.search(freeText, page, size, vitals, inventoryIds)
    }
}



function recipes(id, demoMode = false) {
    if (!demoMode) {
        return call(`recipes/${id}`)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.error('RecipeService Recipes-endpoint', err);
                throw err;
            })
    } else {
        return RecipeServiceMock.recipes(id);
    }
}

const def = {
    search,
    recipes
};
export default def;