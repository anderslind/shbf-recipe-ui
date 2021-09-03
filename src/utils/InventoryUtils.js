function getFilterOptions(id, inventory, recoilInventoryKeyValueMap) {
    const curriedOptionList = curryOptionListWithName(id, inventory, recoilInventoryKeyValueMap);
    for(const [key, val] of Object.entries(curriedOptionList)) {
        if (key === id) {
            return val;
        }
    }
    return [];
}

function filterOptionsOnText(textFilter, options) {
    const lowerTextFilter = textFilter.toLowerCase();
    return (textFilter && options) ? options.filter(option => option.name.toLowerCase().indexOf(lowerTextFilter) > -1 ) : options;
}

/**
 * Iterate facets, that has no name. Lookup name, from Id. Build new structure with id, name, recipe Occurrences.
 * */
function curryOptionListWithName(id, inventory, recoilInventoryKeyValueMap) {
    let response = [];
    for(const [key, array] of Object.entries(inventory)) {
        if (key === id) {
            for (let i=0; i < array.length; i++) {
                const obj = array[i];
                response.push({id: obj['id'], name: recoilInventoryKeyValueMap.get(obj['id']), recipeOccurrences: obj['recipeOccurrences']})
            }
        }
    }
    return {[id]: response};
}

function createKeyValueMap(inventory, setInventoryKeyValueMap) {
    const map = new Map();
    for(const [key, array] of Object.entries(inventory)) {
        for (let i=0; i < array.length; i++) {
            const obj = array[i];
            map.set(obj['id'], obj['name']);
        }
    }
    setInventoryKeyValueMap(map);
}
export {
    getFilterOptions,
    filterOptionsOnText,
    createKeyValueMap
};