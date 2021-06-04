import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {drawerWidth} from "../../App";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, IconButton, Paper} from "@material-ui/core";
import {Close} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContent: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default
    },
    title: {
        flexGrow: 1,
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (showCloseButton) => (
        <div className={classes.root}>
            <AppBar position="relative" className={classes.appBar}>
                <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.title} noWrap>
                        Filter
                    </Typography>
                    {
                        showCloseButton
                        &&
                        <IconButton onClick={() => props.handleDrawerToggle()}>
                            <Close style={{ color: '#fff'}} />
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
            <Paper>
            <div className={classes.drawerContent}>
                {props.children}
            </div>
            </Paper>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.drawer} aria-label="search">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer(true)}
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
