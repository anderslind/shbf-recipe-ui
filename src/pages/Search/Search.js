import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SearchBar from "./components/SearchBar/SearchBar";
import Recipes from "./components/RecipesListing/Recipes";
import {Box, CircularProgress, Container, Divider, IconButton, Link, Typography} from "@material-ui/core";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {
    EMPTY_STATE as FILTER_EMPTY_STATE,
    freeTextSearchState,
    loadingRecipes,
    recipeCount,
    recipeFilter, recipeFilterIds
} from "../../state";
import Hidden from "@material-ui/core/Hidden";
import SearchFilterDesktop from "../../components/SearchFilter/SearchFilterDesktop/SearchFilterDesktop";
import {Apps, TableChart} from "@material-ui/icons";

const filterWidth = '20rem';
const DEFAULT_SHOW_TABLE = false;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    searchContainer: {
        flexGrow: 0,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    actionContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        flexGrow: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    actionFilterFiller: {
        flex: `0 0 ${filterWidth}`,
    },
    actionLeft: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 auto'
    },
    actionRight: {
        display: 'flex',
        flex: '0 0 auto'
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        flex: '1 0 auto',
        padding: 0,
    },
    contentContainerFilter: {
        paddingRight: '1rem',
        position: 'relative',
        flex: `0 0 ${filterWidth}`,
    },
    contentContainerResult: {
        display: 'flex',
        flex: "1 1 auto",
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function Search(props) {
    const classes = useStyles();
    const setFreeTextSearchState = useSetRecoilState(freeTextSearchState);
    const recipeCountState = useRecoilValue(recipeCount);
    const loadingRecipesState = useRecoilValue(loadingRecipes);
    const setRecipeFilterState = useSetRecoilState(recipeFilter);
    const recipeFilterIdsState = useRecoilValue(recipeFilterIds);

    const clearFilter = () => { setRecipeFilterState(FILTER_EMPTY_STATE);}

    const [showTable, setShowTable] = useState(DEFAULT_SHOW_TABLE);

    const onChange = (value) => {
        setFreeTextSearchState(value);
    }
    const onClear = () => {
        setFreeTextSearchState('');
    }
    return (
        <main className={classes.root} displayname={'Search'}>
            <Container maxWidth={'xs'} className={classes.searchContainer}>
                <SearchBar
                    handleDrawerToggle={props.handleDrawerToggle}
                    onChange={onChange}
                    onClear={onClear} />
            </Container>
            <Divider />
            <Container maxWidth={'lg'} className={classes.actionContainer}>
                    <Hidden smDown>
                        <Box className={classes.actionFilterFiller}>
                            {
                                recipeFilterIdsState.length > 0
                                &&
                                <Link href="#" onClick={clearFilter}>Rensa filter</Link>
                            }
                        </Box>
                    </Hidden>
                <Box className={classes.actionLeft}>
                    <Typography variant={'caption'} className={classes.caption}>
                        { loadingRecipesState ? <CircularProgress className={classes.progress} size={'0.5rem'} /> : recipeCountState } recept funna
                    </Typography>
                </Box>
                <Hidden xsDown>
                    <Box className={classes.actionRight}>
                        <IconButton onClick={() => setShowTable(true)}>
                            <TableChart color={showTable ? 'primary' : 'secondary'} />
                        </IconButton>
                        <Divider orientation="vertical" flexItem className={classes.divider}/>
                        <IconButton onClick={() => setShowTable(false)}>
                            <Apps  color={!showTable ? 'primary' : 'secondary'} />
                        </IconButton>
                    </Box>
                </Hidden>
            </Container>
            <Divider />
            <Container maxWidth={'lg'} className={classes.contentContainer}>
                <Hidden smDown>
                    <div className={classes.contentContainerFilter}>
                        <SearchFilterDesktop />
                    </div>
                </Hidden>
                <div className={classes.contentContainerResult}>
                    <Recipes showTable={showTable} />
                </div>
            </Container>
        </main>
    );
}

export default Search;