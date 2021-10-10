import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {Box, createMuiTheme} from '@material-ui/core';
import Routes from './components/Routes/Routes';
import SearchFilter from './components/SearchFilter/SearchFilter/SearchFilter';
import {useSetRecoilState} from 'recoil';
import {recipeFilter, EMPTY_STATE} from './state';

export const drawerWidth = 375;
export const captionColor = '#888';

const customTheme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto Condensed'
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#da3301',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#888'
        },
        background: {
            default: '#fff',
        }
    },
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xs: 0,
            sm: 760,
            md: 1020,
            lg: 1280,
            xl: 1920
        }
    },
    theme: {
        mixins: {
            toolbar: {
                minHeight: 58
            }
        }
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
}));

function App() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const setFilterState = useSetRecoilState(recipeFilter);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const onClearFilter = (part) => {
        if (part) {
            setFilterState((originalFilterState) => ({
                ...originalFilterState,
                [part]: EMPTY_STATE[part]
            }))
        } else {
            setFilterState(EMPTY_STATE);
        }
    };

    return (
        <MuiThemeProvider theme={customTheme} >
            <CssBaseline />
            <Box className={classes.root} displayname={'App'}>
                <ResponsiveDrawer mobileOpen={mobileOpen} onClearFilter={onClearFilter} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilter handleDrawerToggle={handleDrawerToggle} />
                </ResponsiveDrawer>
                <Routes handleDrawerToggle={handleDrawerToggle} />
            </Box>
        </MuiThemeProvider>
    );
}

export default App;
