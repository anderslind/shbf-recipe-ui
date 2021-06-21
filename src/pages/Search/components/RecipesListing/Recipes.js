import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
import {Box} from "@material-ui/core";
import {useRecoilValue} from "recoil";
import {freeTextSearchState, recipeCountState, recipeFilterState} from "../../../../state";

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
}));

const displayname = 'Recipes';

function Recipes(props) {
    const classes = useStyles();
    const recipeCount = useRecoilValue(recipeCountState);
    const freeText = useRecoilValue(freeTextSearchState);
    const filter = useRecoilValue(recipeFilterState);
    const recipes = RecipeService.search(freeText, filter);

    return (
        <div className={classes.recipes} displayname={displayname}>
            <Box>Sökträffar {recipeCount}</Box>
            <Hidden xsDown>
                <TableResultList recipes={recipes} />
            </Hidden>
            <Hidden smUp>
                <CardResultList recipes={recipes} />
            </Hidden>
        </div>
    );
}

export default Recipes;