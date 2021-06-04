import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SearchBar from "./components/SearchBar/SearchBar";
import Recipes from "./components/RecipesListing/Recipes";
import {Container} from "@material-ui/core";
import {GlobalState} from "../../global_state/store";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        '& .MuiPaper-root': {
            marginBottom: theme.spacing(3),
        },
    },
}));

function Search(props) {
    const classes = useStyles();
    const [, dispatch] = useContext(GlobalState);

    const onChange = (value) => {
        dispatch({type: 'UPDATE_FREETEXT_SEARCH', payload: value});
    }
    const onClear = () => {
        dispatch({type: 'UPDATE_FREETEXT_SEARCH', payload: ''});
    }
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth="md">
                <SearchBar handleDrawerToggle={props.handleDrawerToggle} onChange={onChange} onClear={onClear} />
                <Recipes />
            </Container>
        </main>
    );
}

export default Search;