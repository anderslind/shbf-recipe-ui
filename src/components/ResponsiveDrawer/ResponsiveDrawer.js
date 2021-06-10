import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {drawerWidth} from "../../App";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar} from "@material-ui/core";
import Header from "../SearchFilter/components/Header/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        },
    },
    drawer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        overflow: 'hidden',
        width: drawerWidth,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },

    },
    drawerContent: {
        display: 'flex',
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function ResponsiveDrawer({onClearFilter, window, children, handleDrawerToggle, mobileOpen}) {
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (onNavigateBack) => (
        <div className={classes.drawer} displayname={'ResponsiveDrawer'}>
            <Hidden smDown>
                <AppBar position="relative" className={classes.appBar}>
                    <Toolbar variant="dense">
                        <Typography variant="h6" className={classes.title} noWrap>

                        </Typography>
                    </Toolbar>
                </AppBar>
            </Hidden>
            <Header label={'Filter'} onClear={onClearFilter} onNavigateBack={onNavigateBack}/>
            <div className={classes.drawerContent}>
                {children}
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root} aria-label="search">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer(handleDrawerToggle)}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer(false)}
                </Drawer>
            </Hidden>
        </div>
    );
}

export default ResponsiveDrawer;
