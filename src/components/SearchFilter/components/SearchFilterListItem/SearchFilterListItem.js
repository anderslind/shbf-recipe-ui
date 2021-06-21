import React, {useState} from 'react';
import {
    ListItem,
    ListItemText, Tooltip, Typography,
} from "@material-ui/core";
import {NavigateNext} from "@material-ui/icons";
import SearchFilterDetails from "../SearchFilterDetails/SearchFilterDetails";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "../../../../App";
import FormatFilter from "../../utils/FilterUtils";
import {recipeFilterState} from "../../../../state";
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
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0.8em',
        display: 'inline-block',
        fontWeight: 'bold',
        lineHeight: '1.2em',
        marginRight: 5,
        textAlign: 'center',
        width: '1.3em',
    }
}));

function SearchFilterListItem({id, label, children, handleDrawerToggle}) {
    const classes = useStyles();
    const recipeFilter = useRecoilValue(recipeFilterState);

    const filterFormat = new FormatFilter(id);
    const filterText = filterFormat.format(recipeFilter);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <div displayname={'SearchFilterListItem'}>
            <ListItem key={id} button onClick={() => setOpen(true)} className={classes.item}>
                <ListItemText className={classes.text} primaryTypographyProps={{display: 'inline'}}>{label}</ListItemText>
                <ListItemText className={classes.filter}>
                    {
                        filterText.filterCount > 0
                        &&
                        <Tooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Filter för {label}</Typography>
                                    {
                                        filterText
                                            .filterArray
                                            .map(arr => <Typography color="inherit" variant={'body2'}>{arr}</Typography>)
                                    }
                                </React.Fragment>
                            }
                            aria-label={'Active filter'}>
                            <span className={classes.circle}>
                                <Typography variant={'caption'} >
                                    {
                                        filterText.filterCount > 0
                                            ? filterText.filterCount
                                            : null
                                    }
                                </Typography>
                            </span>
                        </Tooltip>
                    }
                </ListItemText>
                <NavigateNext />
            </ListItem>
            <SearchFilterDetails id={id} slide={open} onHide={handleClose} label={label} handleDrawerToggle={handleDrawerToggle}>
                {open && children}
            </SearchFilterDetails>
        </div>
    );
}
export default SearchFilterListItem;