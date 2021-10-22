import React, {useState} from 'react';
import {ListItem, ListItemText, Typography,} from "@mui/material";
import {NavigateNext} from "@mui/icons-material";
import SearchFilterDetails from "../../../components/SearchFilterDetails/SearchFilterDetails";
import makeStyles from '@mui/styles/makeStyles';
import {drawerWidth} from "../../../../../App";
import FormatFilter from "../../../utils/FilterUtils";
import {inventoryKeyValueMap, recipeFilter} from "../../../../../state";
import {useRecoilValue} from "recoil";

const useStyles = makeStyles((theme) => ({
    item: {

    },
    text: {
        maxWidth: drawerWidth - 80,
        overflowX: 'hidden',
        textOverflow: 'ellipsis'
    },
    filter: {
        textAlign: 'right',
        color: theme.palette.primary.dark,
        fontWeight: theme,
    },
    circle: {
        background: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0.8rem',
        display: 'inline-block',
        fontWeight: 'bold',
        lineHeight: '1.2rem',
        marginRight: 5,
        textAlign: 'center',
        width: '1.5rem',
    }
}));

function SearchFilterListItem({id, label, children, handleDrawerToggle}) {
    const classes = useStyles();
    const recipeFilterState = useRecoilValue(recipeFilter);
    const inventoryKeyValueMapState = useRecoilValue(inventoryKeyValueMap);

    const filterFormat = new FormatFilter(id, inventoryKeyValueMapState);
    const filterText = filterFormat.format(recipeFilterState);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <div displayname={'SearchFilterListItem'}>
            <ListItem button onClick={() => setOpen(true)} className={classes.item}>
                <ListItemText className={classes.text} primaryTypographyProps={{display: 'inline'}}>{label}</ListItemText>
                <ListItemText className={classes.filter}>
                    {
                        filterText.filterCount > 0
                        &&
                        <span className={classes.circle}>
                            <Typography>
                                {
                                    filterText.filterCount > 0
                                        ? filterText.filterCount
                                        : null
                                }
                            </Typography>
                        </span>
                    }
                </ListItemText>
                <NavigateNext />
            </ListItem>
            {
                open &&
                <SearchFilterDetails id={id} slide={open} onHide={handleClose} label={label} handleDrawerToggle={handleDrawerToggle}>
                    {children}
                </SearchFilterDetails>
            }
        </div>
    );
}
export default SearchFilterListItem;