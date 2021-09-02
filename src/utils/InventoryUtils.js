function getFilterOptions(id, textFilter, inventory, recoilInventoryKeyValueMap) {
    const curriedOptionList = curryOptionListWithName(id, inventory, recoilInventoryKeyValueMap);
    for(const [key, val] of Object.entries(curriedOptionList)) {
        if (key === id) {
            if (textFilter !== '') {
                return val.filter(v => v.name.toLowerCase().indexOf(textFilter.toLowerCase()) > -1 );
            } else {
                return val;
            }
        }
    }
    return [];
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
    createKeyValueMap
};