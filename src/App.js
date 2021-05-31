import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "./drawer/ResponsiveDrawer";
import {makeStyles} from "@material-ui/core/styles";
import Main from "./main/Main";

export const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
}));

function App() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant="dense">
                    <Typography variant="h6" noWrap>
                        SHBF Receptsök
                    </Typography>
                </Toolbar>
            </AppBar>
            <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <Main handleDrawerToggle={handleDrawerToggle} />
        </div>
    );
}

export default App;
