import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import {FilterList} from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    input: {
        flex: 1
    },
    divider: {
        height: 34,
        margin: 4,
    },
    filterIcon: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '4px',
    },
}));

function Search(props) {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.paper}>
            <InputBase className={classes.input} placeholder="Sök recept..." inputProps={{'aria-label': 'Sök i receptdatabasen'}} />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Hidden mdUp>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} edge="end" aria-label="Visa filter" onClick={() => props.handleDrawerToggle()}>
                    <FilterList className={classes.filterIcon}/>
                </IconButton>
            </Hidden>
        </Paper>
    );
}

export default Search;