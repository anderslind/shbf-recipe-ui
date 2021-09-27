function getFilterOptions(id, inventory, inventoryKeyValueMapState) {
    const curriedOptionList = curryOptionListWithCount(id, inventory, inventoryKeyValueMapState);
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
function curryOptionListWithCount(id, inventory, inventoryKeyValueMapState) {
    const idCountMap = createKeyValueMapForId(id, inventory);
    let response = [];
    if (inventoryKeyValueMapState) {
        inventoryKeyValueMapState.get(id).forEach((value, key) => {
            response.push({id: key, name: value, recipeOccurrences: idCountMap.get(key) || 0})
        });
    }
    return {[id]: response};
}

function createKeyValueMapForId(id, inventory) {
    const map = new Map();
    for(const [key, array] of Object.entries(inventory)) {
        if (key === id) {
            for (let i=0; i < array.length; i++) {
                const obj = array[i];
                map.set(obj['id'], obj['recipeOccurrences']);
            }
        }
    }
    return map;
}
function storeInventory(inventory, setInventoryKeyValueMapState) {
    const inventoryMap = new Map();
    for(const [key, array] of Object.entries(inventory)) {
        const idNameMap = new Map();
        for (let i=0; i < array.length; i++) {
            const obj = array[i];
            idNameMap.set(obj['id'], obj['name']);
        }
        inventoryMap.set(key, idNameMap);
    }
    setInventoryKeyValueMapState(inventoryMap);
}
function getInventoryName(id, filterId, inventoryMapState) {
    let value = 'Unknown';
    if (inventoryMapState) {
        value = inventoryMapState.get(filterId).get(id);
    }
    return value;
}
export {
    getFilterOptions,
    filterOptionsOnText,
    createKeyValueMapForId,
    storeInventory,
    getInventoryName
};