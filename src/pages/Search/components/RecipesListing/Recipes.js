import React, {useEffect, useState} from "react";
import TableResultList from "./components/TableResultList";
import CardResultList from "./components/CardResultList";
import RecipeService from '../../../../services/RecipeService/RecipeService';
// import RecipeServiceMock from "../../../../services/RecipeService/RecipeServiceMock";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    freeTextSearchState,
    inventory,
    inventoryKeyValueMap,
    loadingRecipes,
    recipeCount, recipeFilterCount,
    recipeFilterIds, vitalsForSearch,
} from "../../../../state";
import {storeInventory} from "../../../../utils/InventoryUtils";
import {captionColor} from "../../../../App";
import CardResultListDesktop from "./components/CardResultListDesktop";
import makeStyles from "@mui/styles/makeStyles";
import {Box, useMediaQuery} from "@mui/material";
import SelectedOptions
    from "../../../../components/SearchFilter/components/SearchFilterMultipleSelect/components/SelectedOptions";

const useStyles = makeStyles((theme, props) => ({
    recipes: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignContent: props => props.showTable ? '' : 'stretch',

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
        options: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1.6),
            flex: '0 0 auto',
            border: '#ddd solid 0px',
            borderBottomWidth: '1px',
        },
        listing: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            border: '#ddd solid 0px',
            [theme.breakpoints.down('xs')]: {
                paddingTop: '1rem',
            },
        },
        caption: {
            color: captionColor
    }
}));

const PAGE0 = 0
const DEFAULT_PAGE_SIZE = 99;
export const DEFAULT_TABLE_PAGE_SIZE = 20;
const EMPTY_STATE = { recipeCount: 0, recipeSummaries: [], inventory: [] };
const CLEAR_CACHE = true;

function Recipes(props) {
    const classes = useStyles(props);
    const [recipeCountState, setRecipeCountState] = useRecoilState(recipeCount);
    const freeTextState = useRecoilValue(freeTextSearchState);
    const setInventoryState = useSetRecoilState(inventory);
    const [inventoryKeyValueMapState, setInventoryKeyValueMapState] = useRecoilState(inventoryKeyValueMap);
    const recipeFilterIdsState = useRecoilValue(recipeFilterIds);
    const recipeFilterCountState = useRecoilValue(recipeFilterCount);
    const vitalsForSearchState = useRecoilValue(vitalsForSearch);
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

        setTimeout(() => {
            RecipeService
                .search(freeTextState, clearCache ? 0 : page, rowsPerPage, vitalsForSearchState, recipeFilterIdsState)
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
        }, 1000);
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


    const hiddenSMup = useMediaQuery(theme => theme.breakpoints.up('sm'));
    return (
        <Box className={classes.recipes} displayname={'Recipes'}>
            {
                recipeFilterCountState > 0
                &&
                <Box className={classes.options} style={props.filterVisible ? {borderLeftWidth: '1px'} : null}>
                    <SelectedOptions />
                </Box>
            }
            <Box className={classes.listing} style={props.filterVisible ? {borderLeftWidth: '1px'} : null}>
                {
                    hiddenSMup
                    ?   !props.showTable
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
                    : <CardResultList
                        loading={loadingRecipesState}
                        recipes={searchResultCache.flatMap(cache => cache.recipeSummaries)}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalCount={recipeCountState}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                }
            </Box>
        </Box>
    );
}

export default Recipes;