import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
import {Box, CircularProgress, Link} from "@material-ui/core";
import {useRecoilValue, useRecoilState, useSetRecoilState} from "recoil";
import {
    EMPTY_STATE as FILTER_EMPTY_STATE,
    freeTextSearchState,
    inventory,
    inventoryKeyValueMap, loadingRecipes,
    recipeCount, recipeFilterIds,
    recipeFilter
} from "../../../../state";
import {storeInventory} from "../../../../utils/InventoryUtils";
import CollapsableFilterView from "./components/CollapsableFilterView";

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
    filter: {
    },
    tabletop: {
        display: 'flex'
    },
    tabletop__count: {
        flex: '1 1 auto'
    },
    tabletop__action: {
        flexShrink: '0'
    }
}));

const displayname = 'Recipes';

const PAGE0 = 0, DEFAULT_PAGE_SIZE = 20;
const EMPTY_STATE = { recipeCount: 0, recipeSummaries: [], inventory: [] };
const CLEAR_CACHE = true;
const DEFAULT_SHOW_FILTER = true;

function Recipes(props) {
    const classes = useStyles();
    const [recipeCountState, setRecipeCountState] = useRecoilState(recipeCount);
    const freeTextState = useRecoilValue(freeTextSearchState);
    const setInventoryState = useSetRecoilState(inventory);
    const [inventoryKeyValueMapState, setInventoryKeyValueMapState] = useRecoilState(inventoryKeyValueMap);
    const recipeFilterIdsState = useRecoilValue(recipeFilterIds);
    const setLoadingRecipesState = useSetRecoilState(loadingRecipes);
    const setRecipeFilterState = useSetRecoilState(recipeFilter);

    const [searchResult, setSearchResult] = useState(EMPTY_STATE);
    const [searchResultCache, setSearchResultCache] = useState([]);
    const [page, setPage] = useState(PAGE0);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
    const [showFilter, setShowFilter] = useState(DEFAULT_SHOW_FILTER);

    const toggleShow = () => setShowFilter(!showFilter);
    const clearFilter = () => { setRecipeFilterState(FILTER_EMPTY_STATE);}

    const handleSearchResult = (res, clearCache) => {
        setLoading(false);
        setLoadingRecipesState(false);
        if (!clearCache) {
            setSearchResultCache(searchResultCache.concat(res));
        } else {
            setSearchResultCache([res]);
            setPage(PAGE0);
        }
        setSearchResult(res);

        // The slowness of recoil affects the UX here. Thus we keep a local state for count as well
        setCount(res.recipeCount)
        setRecipeCountState(res.recipeCount)
    }
    const search = (clearCache = false) => {
        setLoading(true);
        setLoadingRecipesState(true);
        if (clearCache) {
            setCount(0);
        }

        RecipeService
            .search(freeTextState, clearCache ? 0 : page, rowsPerPage, recipeFilterIdsState)
            .then(data => {
                if (data.inventory) {
                    if (freeTextState === '') {
                        if (!inventoryKeyValueMapState) {

                            // First load of inventory, create key-value map for inventory ID, NAME
                            storeInventory(data.inventory, setInventoryKeyValueMapState);
                        }
                        setInventoryState(data.inventory);
                    } else {
                        setInventoryState(data.inventory);
                    }
                } else {
                    setInventoryState([]);
                }
                return handleSearchResult(data, clearCache);
            })
            .catch(err => handleSearchResult(EMPTY_STATE));
    }
    const handlePageChange = (page) => { setPage(page);}
    const handleRowsPerPageChange = (rowsPerPage) => { setRowsPerPage(rowsPerPage)}

    useEffect(() => {
        search(CLEAR_CACHE);
        // eslint-disable-next-line
    }, [freeTextState, rowsPerPage, recipeFilterIdsState]);

    useEffect(() => {
        if (searchResultCache.length === 0) {

        } else if (page > searchResultCache.length - 1) {

            // page not in cache, trigger new search
            search();
        } else (

            // Use cached search result
            setSearchResult(searchResultCache[page])
        )
    // eslint-disable-next-line
    }, [page]);



    return (
        <div className={classes.recipes} displayname={displayname}>
            <Box className={classes.filter}>
                <CollapsableFilterView showFilter={showFilter}/>
            </Box>
            <div className={classes.tabletop}>
                <Box className={classes.tabletop__count}>
                    Sökträffar { loading ? <CircularProgress className={classes.progress} size={'0.5rem'} /> : count }
                </Box>
                <Box className={classes.tabletop__action}>
                    {
                        recipeFilterIdsState.length > 0 &&
                        <>
                            <Link href="#" onClick={toggleShow}>
                                {showFilter ? 'Dölj filter' : 'Visa filter'}
                            </Link> | <Link href="#" onClick={clearFilter}>Rensa filter</Link>
                        </>
                    }
                </Box>
            </div>
            <Hidden xsDown>
                <TableResultList
                    loading={loading}
                    recipes={searchResult}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalCount={recipeCountState}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Hidden>
            <Hidden smUp>
                <CardResultList
                    loading={loading}
                    recipes={searchResultCache.flatMap(cache => cache.recipeSummaries)}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalCount={recipeCountState}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Hidden>
        </div>
    );
}

export default Recipes;