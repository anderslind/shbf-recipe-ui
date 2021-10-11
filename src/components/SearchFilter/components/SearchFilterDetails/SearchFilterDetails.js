import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ResponsiveFooter from "../ResponsiveFooter/ResponsiveFooter";
import Hidden from "@mui/material/Hidden";
import Header from "../Header/Header";
import {useSetRecoilState} from "recoil";
import {EMPTY_STATE, recipeFilter} from "../../../../state";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '100%',
        right: '0px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    toolbar: {
        flex: '0 0 48px'
    },
    slideIn: {
        left: '0',
        transition: '200ms'
    },
    slideOut: {
        left: '100%',
        transition: '200ms'
    },
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        paddingLeft: '0.5rem',
        border: '0px gray solid',
        borderBottomWidth: '1px',
        '& .MuiTypography-root': {
            border: '0px gray solid',
            borderLeftWidth: '1px',
            paddingLeft: '0.5rem',
        }
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

function SearchFilterDetails ({id, label, slide, onHide, children, handleDrawerToggle}) {
    const classes = useStyles();
    const setFilterState = useSetRecoilState(recipeFilter);

    const onNavigateBack = () => {
        onHide();
    }
    const onClear = () => {
        if (Array.isArray(id)) {
            id.forEach((i) => {
                setFilterState((originalFilterState) => ({
                    ...originalFilterState,
                    [i]: EMPTY_STATE[i]
                }))
            });
        } else {
            setFilterState((originalFilterState) => ({
                ...originalFilterState,
                [id]: EMPTY_STATE[id]
            }))
        }
    };

    return (
        <div className={`${slide ? classes.slideIn : classes.slideOut} ${classes.root}`} displayname={'SearchFilterDetails'}>
            <div className={classes.container}>
                <Header label={label} onClear={onClear} onNavigateBack={onNavigateBack}/>
                <div className={classes.content}>
                    {children}
                </div>

                <ResponsiveFooter handleDrawerToggle={handleDrawerToggle}/>
            </div>
        </div>
);
}

export default SearchFilterDetails;