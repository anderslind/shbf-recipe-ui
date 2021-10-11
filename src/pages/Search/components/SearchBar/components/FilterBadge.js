import React from "react";
import {Badge, IconButton} from "@mui/material";
import {FilterList} from "@mui/icons-material";
import {useRecoilValue} from "recoil";
import {recipeFilterCount} from "../../../../../state";
import makeStyles from '@mui/styles/makeStyles';

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
        <IconButton
            color="primary"
            className={classes.iconButton}
            edge="end"
            aria-label="Visa filter"
            onClick={() => handleDrawerToggle()}
            size="large">
            <Badge badgeContent={recipeFilterCountState} color="primary">
                <FilterList className={classes.filterIcon}/>
            </Badge>
        </IconButton>
    );
}

export default FilterBadge;
