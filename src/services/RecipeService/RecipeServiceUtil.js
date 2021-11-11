function addInventoryFilters(queryStr, inventoryIds) {
    if (inventoryIds) {
        queryStr = {
            inventoryIds: inventoryIds,
            ...queryStr
        };
    }
    return queryStr;
}

function addVitals(queryStr, vitals) {
    if (vitals['abv'].length > 1) {
        queryStr = {
            minAbv: vitals['abv'][0],
            maxAbv: vitals['abv'][1],
            ...queryStr
        };
    };
    if (vitals['og'].length > 1) {
        queryStr = {
            minOg: vitals['og'][0],
            maxOg: vitals['og'][1],
            ...queryStr
        };
    };

    if (vitals['fg'].length > 1) {
        queryStr = {
            minFg: vitals['fg'][0],
            maxFg: vitals['fg'][1],
            ...queryStr
        };
    };
    return queryStr;
}

export {
    addInventoryFilters,
    addVitals
};