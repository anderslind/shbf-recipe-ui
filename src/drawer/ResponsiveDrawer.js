import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {drawerWidth} from "../App";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        color: '#fff',
        backgroundColor: theme.palette.primary.main
    },
    drawer: {
        flexShrink: 0,
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    drawerPaper: {
        width: drawerWidth,
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
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.drawer} aria-label="search">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
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
            <Hidden xsDown implementation="css">
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
