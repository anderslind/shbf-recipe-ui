import React, {useEffect, useState} from 'react';
import {Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import RecipeService from "../../../../services/RecipeService/RecipeService";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    search: {
        flexShrink: 0
    },
    list: {
        flexGrow: 1,
        overflowY: 'auto',
    }
}));

function SearchFilterMultipleSelect({id, label, onUpdate, values}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(values);
    const [textFilter, setTextFilter] = useState('');
    const [options, setOptions] = useState({[id]: []});

    useEffect(() => {
        RecipeService.loadFilterOptions(id, textFilter).then(result => {
            let updatedOptions = options;
            Object.assign(updatedOptions, result)
            setOptions({...updatedOptions});
        });
    }, [textFilter]);

    useEffect(() => {
        setChecked(values);
    }, [values]);

    const handleToggle = (option) => () => {
        const currentIndex = checked.indexOf(option.name);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(option.name);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        onUpdate(id, newChecked);
    };

    return (
        <div className={classes.root}>
            <TextField
                autoFocus
                fullWidth
                size={'small'}
                id="standard-search"
                label={`Sök efter ${label}`}
                type="search"
                className={classes.search}
                onChange={(e) => setTextFilter(e.target.value)}
            />
            <Divider />
            <List className={classes.list} dense disablePadding>
                {
                    options[id].map(option =>
                        <ListItem button key={option.id} onClick={handleToggle(option)}>
                            <ListItemIcon>
                                <Checkbox
                                    size={'small'}
                                    edge="start"
                                    checked={checked.indexOf(option.name) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText>
                                {option.name}
                            </ListItemText>
                        </ListItem>)
                }
            </List>
        </div>
    );
}

export default SearchFilterMultipleSelect;