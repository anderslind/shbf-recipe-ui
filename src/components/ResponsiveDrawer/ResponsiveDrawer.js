import React from 'react';
import Drawer from '@mui/material/Drawer';
import {useTheme} from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import {drawerWidth} from "../../App";
import {useMediaQuery} from "@mui/material";
import Header from "../SearchFilter/components/Header/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
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

    const hiddenMDdown = useMediaQuery(theme => theme.breakpoints.down('md'));
    const hiddenMDup = !hiddenMDdown;

    const drawer = (onNavigateBack) => (
        <div className={classes.drawer} displayname={'ResponsiveDrawer'}>
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
            {
                hiddenMDup
                ? null
                : <Drawer
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
            }
        </div>
    );
}

export default ResponsiveDrawer;
