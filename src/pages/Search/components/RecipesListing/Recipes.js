import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
import {GlobalState} from "../../../../global_state/store";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
}));

function Recipes(props) {
    const classes = useStyles();
    const [globalState] = useContext(GlobalState);
    const recipes = RecipeService.search(globalState);

    return (
        <div className={classes.recipes}>
            <Box>Sökträffar {globalState.count}</Box>
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