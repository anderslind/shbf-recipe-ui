import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Badge, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import {Clear, FilterList} from "@material-ui/icons";
import Hidden from "@material-ui/core/Hidden";
import Delay from "../../../../utils/DelayedCallWithCancel";
import {GlobalState} from "../../../../global_state/store";


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

const delay = new Delay(750);

function SearchBar(props) {
    const classes = useStyles();
    const [globalState] = useContext(GlobalState);
    const [searchText, setSearchText] = useState('');


    const onChange = (event) => {
        const value = event.target.value;
        setSearchText(value);

        /* Update global state with delay, to avoid ui jitter */
        delay.call(() => props.onChange(value));
    };

    const onClear = () => {
        setSearchText('');
        props.onClear();
    };
    const filterCount = Object.values(globalState.filter).reduce((a, arr) => arr.length > 0 ? a + 1 : a, 0);
    return (
        <Paper component="form" className={classes.paper}>
            <InputBase
                value={searchText}
                className={classes.input}
                placeholder="Sök recept..."
                inputProps={{'aria-label': 'Sök i receptdatabasen'}}
                autoFocus={true}
                onChange={onChange}
            />
            {
                !!searchText
                    ?
                    <IconButton className={classes.iconButton} aria-label="search" onClick={() => onClear()}>
                        <Clear />
                    </IconButton>
                    :
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
            }
            <Hidden mdUp>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} edge="end" aria-label="Visa filter" onClick={() => props.handleDrawerToggle()}>
                    <Badge badgeContent={filterCount} color="primary">
                        <FilterList className={classes.filterIcon}/>
                    </Badge>
                </IconButton>
            </Hidden>
        </Paper>
    );
}

export default SearchBar;