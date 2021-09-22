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
    recipeCountState, recipeFilterIds,
    recipeFilterState
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
    const [recipeCount, setRecipeCount] = useRecoilState(recipeCountState);
    const recoilFreeText = useRecoilValue(freeTextSearchState);
    const setRecoilInventory = useSetRecoilState(inventory);
    const [recoilInventoryKeyValueMap, setRecoilInventoryKeyValueMap] = useRecoilState(inventoryKeyValueMap);
    const recoilRecipeFilterIds = useRecoilValue(recipeFilterIds);
    const setRecoilLoadingRecipes = useSetRecoilState(loadingRecipes);

    const [searchResult, setSearchResult] = useState(EMPTY_STATE);
    const [searchResultCache, setSearchResultCache] = useState([]);
    const [page, setPage] = useState(PAGE0);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

    const setRecoilRecipeFilterState = useSetRecoilState(recipeFilterState);
    const [showFilter, setShowFilter] = useState(DEFAULT_SHOW_FILTER);

    const toggleShow = () => setShowFilter(!showFilter);
    const clearFilter = () => { setRecoilRecipeFilterState(FILTER_EMPTY_STATE);}

    const handleSearchResult = (res, clearCache) => {
        setLoading(false);
        setRecoilLoadingRecipes(false);
        if (!clearCache) {
            setSearchResultCache(searchResultCache.concat(res));
        } else {
            setSearchResultCache([res]);
            setPage(PAGE0);
        }
        setSearchResult(res);

        // The slowness of recoil affects the UX here. Thus we keep a local state for count as well
        setCount(res.recipeCount)
        setRecipeCount(res.recipeCount)
    }
    const search = (clearCache = false) => {
        setLoading(true);
        setRecoilLoadingRecipes(true);
        if (clearCache) {
            setCount(0);
        }

        RecipeService
            .search(recoilFreeText, clearCache ? 0 : page, rowsPerPage, recoilRecipeFilterIds)
            .then(data => {
                if (data.inventory) {
                    if (recoilFreeText === '') {
                        if (!recoilInventoryKeyValueMap) {

                            // First load of inventory, create key-value map for inventory ID, NAME
                            storeInventory(data.inventory, setRecoilInventoryKeyValueMap);
                        }
                        setRecoilInventory(data.inventory);
                    } else {
                        setRecoilInventory(data.inventory);
                    }
                } else {
                    setRecoilInventory([]);
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
    }, [recoilFreeText, rowsPerPage, recoilRecipeFilterIds]);

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
                        recoilRecipeFilterIds.length > 0 &&
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
                    totalCount={recipeCount}
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
                    totalCount={recipeCount}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Hidden>
        </div>
    );
}

export default Recipes;