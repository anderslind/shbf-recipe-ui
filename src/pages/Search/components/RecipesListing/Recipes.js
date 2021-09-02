import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
import {Box} from "@material-ui/core";
import {useRecoilValue, useRecoilState, useSetRecoilState} from "recoil";
import {
    facets,
    freeTextSearchState,
    inventory,
    inventoryKeyValueMap,
    recipeCountState, recipeFilterIds,
    recipeFilterState
} from "../../../../state";
import {createKeyValueMap} from "../../../../utils/InventoryUtils";

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
}));

const displayname = 'Recipes';

const PAGE0 = 0, DEFAULT_PAGE_SIZE = 20;
const EMPTY_STATE = { recipeCount: 0, recipeSummaries: [], inventory: [] };
const CLEAR_CACHE = true;

function Recipes(props) {
    const classes = useStyles();
    const [recipeCount, setRecipeCount] = useRecoilState(recipeCountState);
    const recoilFreeText = useRecoilValue(freeTextSearchState);
    const [recoilInventory, setRecoilInventory] = useRecoilState(inventory);
    const setRecoilInventoryKeyValueMap = useSetRecoilState(inventoryKeyValueMap);
    const recoilRecipeFilterState = useRecoilValue(recipeFilterState);
    const recoilRecipeFilterIds = useRecoilValue(recipeFilterIds);

    const [searchResult, setSearchResult] = useState(EMPTY_STATE);
    const [searchResultCache, setSearchResultCache] = useState([]);
    const [page, setPage] = useState(PAGE0);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

    const handleSearchResult = (res, clearCache) => {
        setLoading(false);
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
    const search = (clearCache) => {
        setLoading(true);
        if (clearCache) {
            setCount(0);
        }

        RecipeService
            .search(recoilFreeText, clearCache ? 0 : page, rowsPerPage, recoilRecipeFilterIds)
            .then(data => {
                if (data.inventory) {
                    if (recoilFreeText === '') {
                        if (recoilInventory.length === 0) {

                            // First load of inventory, create key-value map for inventory ID, NAME
                            createKeyValueMap(data.inventory, setRecoilInventoryKeyValueMap);
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
    }, [recoilFreeText, rowsPerPage, recoilRecipeFilterState]);

    useEffect(() => {
        if (searchResultCache.length === 0) {

        } else if (page > searchResultCache.length - 1) {

            // page not in cache, trigger new search
            search();
        } else (

            // Use cached search result
            setSearchResult(searchResultCache[page])
        )
    }, [page]);



    return (
        <div className={classes.recipes} displayname={displayname}>
            <Box>Sökträffar {count}</Box>
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