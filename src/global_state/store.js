import React, {createContext, useReducer} from "react";
import SearchReducer from "./reducers/SearchReducer";

export const EMPTY_STATE = {
    og: [0, 200],
    fg: [0, 50],
    abv: [0, 15],
    ibu: [0, 80],
}

const initialState = {
    freetext: '',
    filter: Object.assign({}, EMPTY_STATE)
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