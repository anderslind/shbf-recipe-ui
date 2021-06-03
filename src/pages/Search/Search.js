import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SearchBar from "./components/SearchBar/SearchBar";
import Recipes from "./components/RecipesListing/Recipes";
import {Container} from "@material-ui/core";

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

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth="md">
                <SearchBar handleDrawerToggle={props.handleDrawerToggle} />
                <Recipes />
            </Container>
        </main>
    );
}

export default Search;