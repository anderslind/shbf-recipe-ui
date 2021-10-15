import React, {memo, useEffect, useState} from 'react';
import {
    Box,
    Checkbox,
    Divider, IconButton, Input, InputAdornment, InputBase,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField, Typography, useMediaQuery
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import AutoSizer from "react-virtualized-auto-sizer";
import {areEqual, FixedSizeList as List} from 'react-window';
import {useRecoilValue} from "recoil";
import {inventory, inventoryKeyValueMap} from "../../../../state";
import {filterOptionsOnText, getFilterOptions} from "../../../../utils/InventoryUtils";
import SelectedOptions from "./components/SelectedOptions";
import {Clear} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        minHeight: '20rem',
        [theme.breakpoints.down('md')]: {
            minHeight: '100%',
        },
    },
    search: {
        display: 'flex',
        flexShrink: 0,
    },
    searchInput: {
        flex: '1 1 auto',
    },
    searchIcon: {
        flex: '1 1 auto',
    },
    list: {
        flexGrow: 1,
    },
    listItem: {
        display: 'flex',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
    },
    listItemText: {
        flex: '1 1 80%',
    },
    listItemTCount: {
        flex: '1 1 auto',
    },
    listItemText__name: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginRight: '1rem',
    },
    listItemText__right: {
        textAlign: 'right'
    },
    scrollingPlaceholder: {
        display: 'flex',
        paddingLeft: '4.5rem',
        fontSize: '1rem',
        marginTop: '7px',
    },
    scrollingPlaceholder__main: {
        flex: '1 1 auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    scrollingPlaceholder__count: {
        flexShrink: '0',
        marginRight: '1rem',
    }
}));

function SearchFilterMultipleSelect({id, label, onUpdate, values}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(values);
    const [textFilter, setTextFilter] = useState('');
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);

    const inventoryState = useRecoilValue(inventory);
    const inventoryKeyValueMapState = useRecoilValue(inventoryKeyValueMap);

    useEffect(() => {
        const options = getFilterOptions(id, inventoryState, inventoryKeyValueMapState);
        setOptions(options);
        setFilteredOptions(options);
        // eslint-disable-next-line
    }, [inventoryState]);

    useEffect(() => {
        setFilteredOptions(filterOptionsOnText(textFilter, options))
        // eslint-disable-next-line
    }, [textFilter, options]);

    useEffect(() => {
        setChecked(values);
    }, [values]);

    const handleToggle = (option) => () => {
        const currentIndex = checked.indexOf(option.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(option.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        onUpdate(id, newChecked);
    };

    const Row = memo(({index, isScrolling, style}) => (
            <ListItem button key={filteredOptions[index].id} onClick={handleToggle(filteredOptions[index])} style={style}>
                <ListItemIcon>
                    <Checkbox
                        size={'small'}
                        edge="start"
                        checked={checked.indexOf(filteredOptions[index].id) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText className={`${classes.listItemText} ${classes.listItemText__name}`} title={filteredOptions[index].name}>
                    <Typography noWrap>
                        {filteredOptions[index].name}
                    </Typography>
                </ListItemText>
                <ListItemText className={classes.listItemText__right}>
                    {filteredOptions[index].recipeOccurrences}
                </ListItemText>
            </ListItem>
    ), areEqual);

    const hiddenMDup = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <Box className={classes.root}>
            <Box className={classes.search}>
                <InputBase
                    fullWidth
                    size={'small'}
                    id="standard-search"
                    className={classes.searchInput}
                    placeholder={`Filtrera ${label}`}
                    inputProps={{'aria-label': `Filtrera ${label}`}}
                    value={textFilter}
                    onChange={(e) => setTextFilter(e.target.value)}
                />
                {
                    !!textFilter
                        ?
                        <IconButton
                            className={classes.searchIcon}
                            aria-label="search"
                            onClick={() => setTextFilter('')}
                            size="large">
                            <Clear />
                        </IconButton>
                        :
                        <IconButton
                            type="submit"
                            className={classes.searchIcon}
                            aria-label="search"
                            size="large">
                            <SearchIcon />
                        </IconButton>
                }
            </Box>
            <Divider />
            {
                hiddenMDup
                ? null
                : <>
                    <SelectedOptions filterId={id}></SelectedOptions>
                    <Divider />
                </>

            }
            <AutoSizer>
                {({ height, width }) => (
                    <List className={classes.list}
                          useIsScrolling
                          height={height-48}
                          width={width}
                          itemCount={filteredOptions.length}
                          itemSize={35}>
                        { Row }
                    </List>
                )}
            </AutoSizer>
        </Box>
    );
}

export default SearchFilterMultipleSelect;