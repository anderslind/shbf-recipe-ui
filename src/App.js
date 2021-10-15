import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';
import makeStyles from '@mui/styles/makeStyles';
import {Box } from '@mui/material';
import Routes from './components/Routes/Routes';
import SearchFilter from './components/SearchFilter/SearchFilter/SearchFilter';
import {useSetRecoilState} from 'recoil';
import {recipeFilter, EMPTY_STATE} from './state';

export const drawerWidth = 375;
export const captionColor = '#888';

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
        <>
            <CssBaseline />
            <Box className={classes.root} displayname={'App'}>
                <ResponsiveDrawer mobileOpen={mobileOpen} onClearFilter={onClearFilter} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilter handleDrawerToggle={handleDrawerToggle} />
                </ResponsiveDrawer>
                <Routes handleDrawerToggle={handleDrawerToggle} />
            </Box>
        </>
    );
}

export default App;
