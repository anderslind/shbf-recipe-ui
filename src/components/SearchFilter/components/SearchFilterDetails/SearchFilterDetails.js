import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import ResponsiveFooter from "../ResponsiveFooter/ResponsiveFooter";
import Hidden from "@material-ui/core/Hidden";
import Header from "../Header/Header";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {EMPTY_STATE, recipeCountState, recipeFilterState} from "../../../../state";

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
        height: 48
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
        overflow: 'auto'
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
        overflow: 'auto',
        paddingRight: '1rem',
        paddingLeft: '1rem',
    },
}));

function SearchFilterDetails ({id, label, slide, onHide, children, handleDrawerToggle}) {
    const classes = useStyles();
    const setFilterState = useSetRecoilState(recipeFilterState);

    const onNavigateBack = () => {
        onHide();
    }
    const showResult = () => {
        onHide();
        handleDrawerToggle();
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
            <Hidden smDown>
                <div className={classes.toolbar} />
            </Hidden>
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