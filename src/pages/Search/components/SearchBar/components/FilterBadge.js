import React from "react";
import {Badge, IconButton} from "@material-ui/core";
import {FilterList} from "@material-ui/icons";
import {useRecoilValue} from "recoil";
import {recipeFilterCount} from "../../../../../state";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    filterIcon: {
        color: '#fff',
        backgroundColor: theme.palette.action.active,
        borderRadius: '4px',
    },
}));

function FilterBadge({handleDrawerToggle}) {
    const classes = useStyles();
    const recipeFilterCountState = useRecoilValue(recipeFilterCount);

    return (
        <IconButton color="primary" className={classes.iconButton} edge="end" aria-label="Visa filter" onClick={() => handleDrawerToggle()}>
            <Badge badgeContent={recipeFilterCountState} color="primary">
                <FilterList className={classes.filterIcon}/>
            </Badge>
        </IconButton>
    );
}

export default FilterBadge;
