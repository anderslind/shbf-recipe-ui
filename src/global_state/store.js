import React, {createContext, useReducer} from "react";
import SearchReducer from "./reducers/SearchReducer";

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

const initialState = {
    freetext: '',
    filter: Object.assign({}, EMPTY_STATE),
    count: 0,
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, initialState);

    return (
        <GlobalState.Provider value={[state, dispatch]}>
            {children}
        </GlobalState.Provider>
    );
}

export const GlobalState = createContext(initialState);
export default Store;