import {abvFormat, defaultFormat, gravityFormat,} from "./FormatUtils";

const i18n = {
    og: 'OG',
    fg: 'FG',
    abv: 'ABV',
    ibu: 'IBU',
    size: 'Storlek',
    style: 'Stil',
    hops: 'Humle',
    yeasts: 'Jäst',
    fermentables: 'Jäsbara'
}

function getFormatter(filterId, mapper) {

    const FormatterMappings = {
        SPAN: ['og', 'fg', 'abv', 'ibu', 'size'],
        TEXT: ['style', 'hops', 'yeasts', 'fermentables']
    };
    const format = (type) => {
        switch (type) {
            case 'og':
            case 'fg':
                return gravityFormat;
            case 'abv':
                return abvFormat;
            default:
                return defaultFormat;
        }
    };

    const Formatters = {
        TEXT:   text,
        SPAN:   span,
    };

    function text(filterId, textArray) {
        return mapper && textArray ? textArray.map(text => mapper[text]) : textArray;
    };

    function span(filterId, numberArray) {
        if (numberArray.length === 0) {
            return undefined;
        }
        if (numberArray.length > 3) {
            throw new Error('Span can only handle an array with 2 elements')
        }
        return `${!!filterId ? i18n[filterId] +': ' : ''}${format(filterId)(numberArray[0])} to ${format(filterId)(numberArray[1])}`;
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

    constructor(filterIds, recoilInventoryKeyValueMap) {
        this.filterIds = !Array.isArray(filterIds) ? [filterIds] : filterIds;
        this.mapper = recoilInventoryKeyValueMap;
    }

    format(globalStateFilter) {
        const values = [];
        this.filterIds
            .forEach(filterId => {
                const value = getFormatter(filterId, this.mapper)(addPrefix(this.filterIds, filterId), globalStateFilter[filterId]);
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