import React, {memo, useEffect, useState} from 'react';
import {
    Checkbox,
    Divider, Link,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AutoSizer from "react-virtualized-auto-sizer";
import {areEqual, FixedSizeList as List} from 'react-window';
import {useRecoilValue} from "recoil";
import {inventory, inventoryKeyValueMap} from "../../../../state";
import {filterOptionsOnText, getFilterOptions} from "../../../../utils/InventoryUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        height: '100%'
    },
    search: {
        flexShrink: 0,
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
        paddingLeft: '4.5rem'
    }
}));

function SearchFilterMultipleSelect({id, label, onUpdate, values}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(values);
    const [textFilter, setTextFilter] = useState('');
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);

    const recoilInventory = useRecoilValue(inventory);
    const recoilInventoryKeyValueMap = useRecoilValue(inventoryKeyValueMap);

    useEffect(() => {
        const options = getFilterOptions(id, recoilInventory, recoilInventoryKeyValueMap);
        setOptions(options);
        setFilteredOptions(options);
        // eslint-disable-next-line
    }, [recoilInventory]);

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
        isScrolling
            ? <div style={style} className={classes.scrollingPlaceholder}>{filteredOptions[index].name}</div>
            : <ListItem button key={filteredOptions[index].id} onClick={handleToggle(filteredOptions[index])} style={style}>
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
                    {filteredOptions[index].name}
                </ListItemText>
                <ListItemText className={`${classes.listItemText} ${classes.listItemText__right}`}>
                    {filteredOptions[index].recipeOccurrences}
                </ListItemText>
            </ListItem>
    ), areEqual);

    return (
        <div className={classes.root}>
            <TextField
                autoFocus
                fullWidth
                size={'small'}
                id="standard-search"
                label={`Sök efter ${label}`}
                type="search"
                variant="filled"
                className={classes.search}
                onChange={(e) => setTextFilter(e.target.value)}
            />
            <Divider />
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
        </div>
    );
}

export default SearchFilterMultipleSelect;