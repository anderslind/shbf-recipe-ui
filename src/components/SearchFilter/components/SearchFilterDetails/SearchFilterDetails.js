import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import Footer from "../Footer/Footer";
import Hidden from "@material-ui/core/Hidden";
import Header from "../Header/Header";
import {EMPTY_STATE, GlobalState} from "../.././../../global_state/store";

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
    const [globalState, dispatch] = useContext(GlobalState);

    const onNavigateBack = () => {
        onHide();
    }
    const showResult = () => {
        onHide();
        handleDrawerToggle();
    }
    const onClear = () => {
        const params = globalState.filter;
        if (Array.isArray(id)) {
            id.forEach((i) => {
                Object.assign(params, {[i]: EMPTY_STATE[i]});
            });
        } else {
            Object.assign(params, {[id]: EMPTY_STATE[id]});
        }

        dispatch({type: 'UPDATE_FILTER', payload: params});
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

                <Footer>
                    <Hidden mdUp>
                        <Footer>
                            <Button size={'small'} variant={'contained'} color={'primary'} onClick={showResult}>
                                {`Visa ${globalState.count} recept`}
                            </Button>
                        </Footer>
                    </Hidden>
                </Footer>
            </div>
        </div>
);
}

export default SearchFilterDetails;