function mockBackendSearchService(params, rows) {
    const {freetext, filter} = params;

    return rows.filter((row, index) => {
        let textMatch = true;
        let paramMatch = true;
        if (freetext) {
            textMatch
                = row.name.toLowerCase().indexOf(freetext.toLowerCase()) > -1
                || row.style.toLowerCase().indexOf(freetext.toLowerCase()) > -1;
        }
        if (filter) {
            for(const[paramKey, paramValue] of Object.entries(filter)) {
                for (const [key, value] of Object.entries(row)) {
                    const rowValue = key === paramKey.toLowerCase() ? value : undefined;
                    if (rowValue) {
                        const fixedRowValue = key === 'og' || key === 'fg' ? (rowValue - 1) * 1000 : rowValue;
                        if(fixedRowValue < paramValue[0] || fixedRowValue > paramValue[1]) {
                            paramMatch = false;
                        }
                    }
                }
            }

            // filter.forEach(param => {
            //     for (const [key, value] of Object.entries(row)) {
            //         const rowValue = key === param.label.toLowerCase() ? value : undefined;
            //         if (rowValue) {
            //             const fixedRowValue = key === 'og' || key === 'fg' ? (rowValue - 1) * 1000 : rowValue;
            //             if(fixedRowValue < param.value[0] || fixedRowValue > param.value[1]) {
            //                 paramMatch = false;
            //             }
            //         }
            //     }
            // });
        }
        return textMatch && paramMatch;
    });;
}

function createData(uuid, name, style, size, og, fg, abv, ibu, ebc, placing, views) {
    return { uuid, name, style, size, og, fg, abv, ibu, ebc, placing, views};
}

const rows = [
    createData('71fdd733-2799-43d4-b2ef-5e41fc82902d', 'Nisses Enkla', 'APA',24, 1.055, 1.009, 5.5, 20, 5, 23, 345),
    createData('82463436-bf42-4b43-90bf-ec97341918eb','Sigges Strong Ale', 'Ale',24, 1.075, 1.013, 7.5, 50, 18, 2, 5),
    createData('71a7a2dd-4204-4938-9131-e17ba831d5be','A fantastic travel American Pale Ale *Citra Special Edition*', 'Ale',18, 1.055, 1.011, 6.5, 51.6, 30, 125, 1345),
    createData('053637c4-cf5b-4e6b-8d96-6a8f55ab883c','Port of Call', 'Porter',18, 1.070, 1.011, 7.2, 45.6, 45, 56, 945),
    createData('fda1928d-c7aa-4c93-8def-d33100ca0bdb','Beware of the Dark', 'Stout',18, 1.070, 1.010, 7.2, 45.6, 65.2, 12, 1345),
];

function search(params) {
    return mockBackendSearchService(params, rows);
};
function load(uuid) {
    return rows.find(row => row.uuid === uuid);
};

const def = {search, load}
export default def;