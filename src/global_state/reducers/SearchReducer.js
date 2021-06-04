const SearchReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FREETEXT_SEARCH':
            return {
                ...state,
                freetext: action.payload
            };
        case 'UPDATE_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        default: return state;
    }
};
export default SearchReducer;