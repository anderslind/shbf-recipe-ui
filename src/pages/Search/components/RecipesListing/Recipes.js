import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService';

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
}));

function Recipes(props) {
    const classes = useStyles();

    const recipes = RecipeService.search();

    return (
        <div className={classes.recipes}>

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