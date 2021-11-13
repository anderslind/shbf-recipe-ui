import React from "react";
import {IconButton} from "@mui/material";
import {FilterList} from "@mui/icons-material";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
}));

function FilterBadge({handleDrawerToggle}) {
    const classes = useStyles();

    return (
        <IconButton
            color="primary"
            className={classes.iconButton}
            edge="end"
            aria-label="Visa filter"
            onClick={() => handleDrawerToggle()}
            size="large">
                <FilterList color={'secondary'}/>
        </IconButton>
    );
}

export default FilterBadge;
