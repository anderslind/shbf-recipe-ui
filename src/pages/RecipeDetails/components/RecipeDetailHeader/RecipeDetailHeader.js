import {Typography} from "@mui/material";
import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    recipeDetailsHeader: {

    }
}));

function RecipeDetailHeader({children, ...props}) {
    const classes = useStyles();
    return (
        <Typography
            color={'textSecondary'}
            variant={'overline'}
            className={classes.recipeDetailsHeader}
            {...props}>
            {children}
        </Typography>
    )
};

export default RecipeDetailHeader;