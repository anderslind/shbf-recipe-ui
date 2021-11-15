function getFilterOptions(id, inventory, inventoryKeyValueMapState) {
    return curryOptionListWithCount(id, inventory, inventoryKeyValueMapState);
}

function filterOptionsOnText(textFilter, options) {
    const lowerTextFilter = textFilter.toLowerCase();
    return (textFilter && options) ? options.filter(option => option.name.toLowerCase().indexOf(lowerTextFilter) > -1 ) : options;
}

/**
 * Iterate facets, that has no name. Lookup name, from Id. Build new structure with id, name, recipe Occurrences.
 * */
function curryOptionListWithCount(id, inventory, inventoryKeyValueMapState) {
    const sortFn = (a, b) => a.name.localeCompare(b.name);

    const idCountMap = createKeyValueMapForId(id, inventory);
    let itemsWithCount = [];
    let itemsWithZeroCount = [];
    if (inventoryKeyValueMapState) {
        inventoryKeyValueMapState.get(id).forEach((value, key) => {
            const count = idCountMap.get(key);
            if (count) {
                itemsWithCount.push({id: key, name: value, recipeOccurrences: count})
            } else {
                itemsWithZeroCount.push({id: key, name: value, recipeOccurrences: 0})
            }
        });
    }
    itemsWithCount.sort(sortFn);
    itemsWithZeroCount.sort(sortFn);
    return itemsWithCount.concat(itemsWithZeroCount);
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