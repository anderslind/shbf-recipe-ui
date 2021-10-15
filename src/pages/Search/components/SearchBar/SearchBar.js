import React, {useState} from "react";
import makeStyles from '@mui/styles/makeStyles';
import {IconButton, InputBase, Paper, useMediaQuery} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import {Clear} from "@mui/icons-material";
import Delay from "../../../../utils/DelayedCallWithCancel";
import FilterBadge from "./components/FilterBadge";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        flex: '1 1 auto',
    },
    input: {
        flex: 1
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    filterIcon: {
        color: '#fff',
        backgroundColor: theme.palette.action.active,
        borderRadius: '4px',
    },
}));

const delay = new Delay(700);

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
    const handleOnSubmit = event => { event.preventDefault() };

    const hiddenMDup = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <Paper component="form" className={classes.paper} onSubmit={handleOnSubmit}>
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
                    <IconButton
                        aria-label="search"
                        onClick={() => handleOnClear()}
                        size="large">
                        <Clear />
                    </IconButton>
                    :
                    <IconButton
                        type="submit"
                        disabled
                        aria-label="search"
                        size="large">
                        <SearchIcon />
                    </IconButton>
            }
            {
                hiddenMDup
                ? null
                : <>
                    <Divider orientation="vertical" flexItem className={classes.divider} />
                    <FilterBadge handleDrawerToggle={handleDrawerToggle}/>
                </>
            }
        </Paper>
    );
}

export default SearchBar;