import React, {useEffect, useState} from 'react';
import {
    Checkbox,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList as List} from 'react-window';
import {useRecoilValue} from "recoil";
import {facets, inventory, inventoryKeyValueMap} from "../../../../state";
import {getFilterOptions} from "../../../../utils/InventoryUtils";

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
    }
}));
const DEFAULT_ROWS = 50;
function SearchFilterMultipleSelect({id, label, onUpdate, values}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(values);
    const [textFilter, setTextFilter] = useState('');
    const [options, setOptions] = useState([]);
    const [rows, setRows] = useState(DEFAULT_ROWS);

    const recoilInventory = useRecoilValue(inventory);
    const recoilInventoryKeyValueMap = useRecoilValue(inventoryKeyValueMap);

    useEffect(() => {
        setOptions(getFilterOptions(id, textFilter, recoilInventory, recoilInventoryKeyValueMap))
        // eslint-disable-next-line
    }, [textFilter, recoilInventory]);

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
    const moreRows = () => {
        setRows(rows + DEFAULT_ROWS);
    }
    const Row = ({index, style}) => (
            <ListItem button key={options[index].id} onClick={handleToggle(options[index])} style={style}>
                <ListItemIcon>
                    <Checkbox
                        size={'small'}
                        edge="start"
                        checked={checked.indexOf(options[index].id) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText className={`${classes.listItemText} ${classes.listItemText__name}`} title={options[index].name}>
                    {options[index].name}
                </ListItemText>
                <ListItemText className={`${classes.listItemText} ${classes.listItemText__right}`}>
                    {options[index].recipeOccurrences}
                </ListItemText>
            </ListItem>
    );

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
                            height={height-48}
                            width={width}
                          itemCount={options.length}
                          itemSize={35}>
                        { Row }
                    </List>
                )}
            </AutoSizer>
        </div>
    );
}

export default SearchFilterMultipleSelect;