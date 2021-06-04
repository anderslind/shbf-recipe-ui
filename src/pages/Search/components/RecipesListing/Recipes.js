import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
import {GlobalState} from "../../../../global_state/store";

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
}));

function Recipes(props) {
    const classes = useStyles();
    const [state] = useContext(GlobalState);
    const recipes = RecipeService.search(state);

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