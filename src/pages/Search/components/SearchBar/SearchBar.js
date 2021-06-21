import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Badge, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import {Clear, FilterList} from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";
import Delay from "../../../../utils/DelayedCallWithCancel";
import {useRecoilValue} from "recoil";
import {recipeFilterCountState} from "../../../../state";
import FilterBadge from "./components/FilterBadge";

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
        backgroundColor: theme.palette.action.active,
        borderRadius: '4px',
    },
}));

const delay = new Delay(400);

function SearchBar({onClear, onChange, handleDrawerToggle}) {
    const classes = useStyles();

    const [searchText, setSearchText] = useState('');


    const handleOnChange = (event) => {
        const value = event.target.value;
        setSearchText(value);

        /* Update global state with delay, to avoid ui jitter */
        delay.call(() => onChange(value));
    };

    const handleOnClear = () => {
        setSearchText('');
        onClear();
    };
    return (
        <Paper component="form" className={classes.paper}>
            <InputBase
                value={searchText}
                className={classes.input}
                placeholder="Sök recept..."
                inputProps={{'aria-label': 'Sök i receptdatabasen'}}
                autoFocus={true}
                onChange={handleOnChange}
            />
            {
                !!searchText
                    ?
                    <IconButton className={classes.iconButton} aria-label="search" onClick={() => handleOnClear()}>
                        <Clear />
                    </IconButton>
                    :
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
            }
            <Hidden mdUp>
                <Divider className={classes.divider} orientation="vertical" />
                <FilterBadge handleDrawerToggle={handleDrawerToggle}/>
            </Hidden>
        </Paper>
    );
}

export default SearchBar;