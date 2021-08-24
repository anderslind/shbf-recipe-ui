import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SearchBar from "./components/SearchBar/SearchBar";
import Recipes from "./components/RecipesListing/Recipes";
import {Container} from "@material-ui/core";
import {useSetRecoilState} from "recoil";
import {freeTextSearchState} from "../../state";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0),
        '& .MuiPaper-root': {
            marginBottom: theme.spacing(3),
        },
    },
    content: {
        
    }
}));

function Search(props) {
    const classes = useStyles();
    const setFreeTextSearchState = useSetRecoilState(freeTextSearchState);

    const onChange = (value) => {
        setFreeTextSearchState(value);
    }
    const onClear = () => {
        setFreeTextSearchState('');
    }
    return (
        <main className={classes.root} displayname={'Search'}>
            <div className={classes.toolbar} />
            <div className={classes.content}>
                <Container maxWidth="md">
                    <SearchBar handleDrawerToggle={props.handleDrawerToggle} onChange={onChange} onClear={onClear} />
                    <Recipes />
                </Container>
            </div>
        </main>
    );
}

export default Search;