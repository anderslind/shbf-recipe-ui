import {selector} from "recoil";

const {atom} = require("recoil");

export const EMPTY_STATE = {
    og: [],
    fg: [],
    abv: [],
    ibu: [],
    size: [],
    style: [],
    hops: [],
    yeast: [],
}

const recipeFilterState = atom({
    key: 'recipeFilterState',
    default: EMPTY_STATE,
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
export {
    recipeFilterState,
    recipeFilterCountState,
    recipeCountState,
    freeTextSearchState
}