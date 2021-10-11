import React, {useEffect, useState} from "react";
import makeStyles from '@mui/styles/makeStyles';
import TableResultList from "./components/TableResultList";
import Hidden from "@mui/material/Hidden";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
// import RecipeServiceMock from "../../../../services/RecipeService/RecipeServiceMock";
import {Box} from "@mui/material";
import {useRecoilValue, useRecoilState, useSetRecoilState} from "recoil";
import {
    freeTextSearchState,
    inventory,
    inventoryKeyValueMap, loadingRecipes,
    recipeCount, recipeFilterIds,
} from "../../../../state";
import {storeInventory} from "../../../../utils/InventoryUtils";
import {captionColor} from "../../../../App";
import CardResultListDesktop from "./components/CardResultListDesktop";

const useStyles = makeStyles((theme, props) => ({
    recipes: {
        display: 'flex',
        flex: '1 1 auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: props => props.showTable ? '' : 'center',

        },
        filter: {
        },
        tabletop: {
            display: 'flex'
        },
        tabletop__left: {
            flex: '1 1 auto'
        },
        tabletop__right: {
            display: 'flex',
            flexShrink: '0',
            '& > *': {
                marginRight: theme.spacing(1)
            }
        },
        listing: {
            flex: '1 1 auto',
            [theme.breakpoints.down('sm')]: {
                paddingTop: '1rem',
            },
        },
        caption: {
            color: captionColor
    }
}));

const PAGE0 = 0, DEFAULT_PAGE_SIZE = 20;
const EMPTY_STATE = { recipeCount: 0, recipeSummaries: [], inventory: [] };
const CLEAR_CACHE = true;

function Recipes(props) {
    const classes = useStyles(props);
    const [recipeCountState, setRecipeCountState] = useRecoilState(recipeCount);
    const freeTextState = useRecoilValue(freeTextSearchState);
    const setInventoryState = useSetRecoilState(inventory);
    const [inventoryKeyValueMapState, setInventoryKeyValueMapState] = useRecoilState(inventoryKeyValueMap);
    const recipeFilterIdsState = useRecoilValue(recipeFilterIds);
    const [loadingRecipesState, setLoadingRecipesState] = useRecoilState(loadingRecipes);

    const [searchResult, setSearchResult] = useState(EMPTY_STATE);
    const [searchResultCache, setSearchResultCache] = useState([]);
    const [page, setPage] = useState(PAGE0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

    const handleSearchResult = (res, clearCache) => {
        setLoadingRecipesState(false);
        if (!clearCache) {
            setSearchResultCache(searchResultCache.concat(res));
        } else {
            setSearchResultCache([res]);
            setPage(PAGE0);
        }
        setSearchResult(res);
        setRecipeCountState(res.recipeCount)
    }
    const search = (clearCache = false) => {
        setLoadingRecipesState(true);
        if (clearCache) {
            setSearchResultCache([]);
            setSearchResult(EMPTY_STATE);
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
            .catch(err => handleSearchResult(EMPTY_STATE, clearCache));
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
        <Box className={classes.recipes} displayname={'Recipes'}>
            <Box className={classes.listing}>
                <Hidden smDown>
                    {
                        !props.showTable
                            ? <CardResultListDesktop
                                loading={loadingRecipesState}
                                recipes={searchResultCache.flatMap(cache => cache.recipeSummaries)}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                totalCount={recipeCountState}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                            />
                            : <TableResultList
                                loading={loadingRecipesState}
                                recipes={searchResult}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                totalCount={recipeCountState}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                            />
                    }
                </Hidden>
                <Hidden smUp>
                    <CardResultList
                        loading={loadingRecipesState}
                        recipes={searchResultCache.flatMap(cache => cache.recipeSummaries)}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={recipeCountState}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Hidden>
            </Box>
        </Box>
    );
}

export default Recipes;