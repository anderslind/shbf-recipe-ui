const i18n = {
    og: 'OG',
    fg: 'FG',
    abv: 'ABV',
    ibu: 'IBU',
    size: 'Storlek',
    style: 'Stil',
    hops: 'Humle',
    yeast: 'Jäst'
}

function getFormatter(filterId) {

    const FormatterMappings = {
        SPAN: ['og', 'fg', 'abv', 'ibu', 'size'],
        TEXT: ['style', 'hops', 'yeast']
    };

    const Formatters = {
        TEXT:   text,
        SPAN:   span,
    };

    function text(filterId, textArray) {
        return textArray;
    };

    function span(filterId, numberArray) {
        if (numberArray.length === 0) {
            return undefined;
        }
        if (numberArray.length > 3) {
            throw new Error('Span can only handle an array with 2 elements')
        }
        return `${!!filterId ? i18n[filterId] +': ' : ''}${numberArray[0]} to ${numberArray[1]}`;
    };

    for (const [key, val] of Object.entries(FormatterMappings)){
        if (val.some(type => type === filterId)) {
            return Formatters[key];
        }
    }
    throw new Error('No formatter found for ' + filterId);
}

function response(valueArray) {
    return {
        filterArray: valueArray.length > 0 ? Array.isArray(valueArray[0]) ? valueArray[0] : valueArray : '',
        filterCount: valueArray.length > 0 ? Array.isArray(valueArray[0]) ? valueArray[0].length : valueArray.length : 0
    }
}

function addPrefix(arr, id) {
    return arr.length > 1 ? id : undefined;
}

class FormatFilter {

    constructor(filterIds) {
        this.filterIds = !Array.isArray(filterIds) ? [filterIds] : filterIds;
    }

    format(globalStateFilter) {
        const values = [];
        this.filterIds
            .forEach(filterId => {
                const value = getFormatter(filterId)(addPrefix(this.filterIds, filterId), globalStateFilter[filterId]);
                if (!!value) {
                    values.push(value);
                }
            });

        return response(
            values
        );
    }
}

export default FormatFilter;