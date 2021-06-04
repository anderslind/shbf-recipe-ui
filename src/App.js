import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";
import {makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import {createMuiTheme} from "@material-ui/core";
import Routes from "./components/Routes/Routes";
import SearchFilter from "./components/SearchFilter/SearchFilter";

export const drawerWidth = 375;

const customTheme = createMuiTheme({
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xs: 0,
            sm: 760,
            md: 1060,
            lg: 1280,
            xl: 1920
        }
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        [customTheme.breakpoints.up('md')]: {
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
        <MuiThemeProvider theme={customTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar variant="dense">
                        <Typography variant="h6" noWrap>
                            SHBF Receptsök
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilter handleDrawerToggle={handleDrawerToggle} />
                </ResponsiveDrawer>
                <Routes handleDrawerToggle={handleDrawerToggle}/>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
