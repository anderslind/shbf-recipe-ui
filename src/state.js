import {selector, atom} from "recoil";


export const EMPTY_STATE = {
    og: [],
    fg: [],
    abv: [],
    ibu: [],
    size: [],
    style: [],
    hops: [],
    yeasts: [],
    fermentables: [],
}
const inventory = atom({
    key: 'inventory',
    default: []
});
const inventoryKeyValueMap = atom({
    key: 'inventoryKeyValueMap',
    default: null
});
const recipeFilterState = atom({
    key: 'recipeFilterState',
    default: EMPTY_STATE,
});
const recipeFilterIds = selector({
    key: 'recipeFilterIds',
    get: ({get}) => {
        return Object.values(get(recipeFilterState)).flat();
    }
});
const recipeFilterCountState = selector({
    key: 'recipeFilterCountState',
    get: ({get}) => {
        return Object.values(get(recipeFilterState)).reduce((acc, arr) => arr.length > 0 ? acc + 1 : acc, 0);
    }
});
const recipeCountState = atom({
    key: 'recipeCountState',
    default: 0
});
const freeTextSearchState = atom({
    key: 'freeTextSearchState',
    default: ''
});
const loadingRecipes = atom({
    key: 'loadingRecipes',
    default: false
});
export {
    inventory,
    inventoryKeyValueMap,
    recipeFilterState,
    recipeFilterCountState,
    recipeFilterIds,
    recipeCountState,
    freeTextSearchState,
    loadingRecipes
}