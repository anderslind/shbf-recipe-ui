import {atom, selector} from "recoil";


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
const recipeFilter = atom({
    key: 'recipeFilterState',
    default: EMPTY_STATE,
});
const recipeFilterIds = selector({
    key: 'recipeFilterIds',
    get: ({get}) => {
        return Object.values(get(recipeFilter)).flat();
    }
});
const recipeFilterCount = selector({
    key: 'recipeFilterCountState',
    get: ({get}) => {
        return Object.values(get(recipeFilter)).reduce((acc, arr) => arr.length > 0 ? acc + 1 : acc, 0);
    }
});
const recipeCount = atom({
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
const filterVisible = atom({
    key: 'filterVisible',
    default: false
});
export {
    inventory,
    inventoryKeyValueMap,
    recipeFilter,
    recipeFilterCount,
    recipeFilterIds,
    recipeCount,
    freeTextSearchState,
    loadingRecipes,
    filterVisible
}