import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {drawerWidth} from "../App";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

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
    // necessary for content to be below app bar
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#fafafa'
    },
    drawerContent: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div className={classes.root}>
            <Toolbar variant="dense">
                <Typography variant="h6" noWrap>
                    Filter
                </Typography>
            </Toolbar>
            <div className={classes.drawerContent}>Content</div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.drawer} aria-label="search">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
                <Drawer
                    className={classes.drawer}
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
                    {drawer}
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
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}

export default ResponsiveDrawer;
