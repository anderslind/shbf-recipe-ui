import React from 'react';
import {Backdrop, Box, CircularProgress} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import SearchFilterListItem from "./components/SearchFilterListItem/SearchFilterListItem";
import SearchFilterSlider from "../components/SearchFilterSlider/SearchFilterSlider";
import SearchFilterMultipleSelect from "../components/SearchFilterMultipleSelect/SearchFilterMultipleSelect";
import ResponsiveFooter from "../components/ResponsiveFooter/ResponsiveFooter";
import {useRecoilState, useRecoilValue} from "recoil";
import {loadingRecipes, recipeFilter} from "../../../state";
import {abvFormat, defaultFormat} from "../utils/FormatUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.background.default,
    },
    content: {
        flexGrow: 1
    }
}));

function SearchFilter({handleDrawerToggle}) {
    const classes = useStyles();
    const [filterState, setFilterState] = useRecoilState(recipeFilter);
    const loadingRecipesState = useRecoilValue(loadingRecipes);

    const onUpdate = (id, value) => {
        setFilterState((originalFilterState) => ({
            ...originalFilterState,
            [id]: value
        }))
    };

    return (
        <div className={classes.root} displayname={'SearchFilter'}>
            <Backdrop className={classes.backdrop} open={loadingRecipesState}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.content}>
                <SearchFilterListItem
                    id={['og', 'fg', 'ibu', 'abv', 'size']}
                    label={'Vitalparametrar'}
                    handleDrawerToggle={handleDrawerToggle}>
                    <Box style={{marginTop: '1rem'}}>
                        <SearchFilterSlider
                            id={'abv'}
                            label={'ABV'}
                            max={15}
                            step={0.5}
                            valueText={abvFormat}
                            onUpdate={onUpdate}
                            value={filterState.abv.slice()}
                        />
                        <SearchFilterSlider
                            id={'og'}
                            label={'OG'}
                            max={200}
                            valueText={defaultFormat}
                            onUpdate={onUpdate}
                            value={[...filterState.og]}
                        />
                        <SearchFilterSlider
                            id={'fg'}
                            label={'FG'}
                            max={50}
                            valueText={defaultFormat}
                            onUpdate={onUpdate}
                            value={filterState.fg.slice()}
                        />
                        <SearchFilterSlider
                            id={'size'}
                            label={'Storlek'}
                            max={50}
                            valueText={defaultFormat}
                            onUpdate={onUpdate}
                            value={filterState.size.slice()}
                        />
                        <SearchFilterSlider
                            id={'ibu'}
                            label={'IBU'}
                            max={80}
                            valueText={defaultFormat}
                            onUpdate={onUpdate}
                            value={filterState.ibu.slice()}
                        />
                    </Box>
                </SearchFilterListItem>

                <SearchFilterListItem id={'fermentables'} label={'Jäsbara'} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'fermentables'} label={'Jäsbara'} values={filterState.fermentables} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem id={'hops'} label={'Humle'} filter={filterState.hops} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'hops'} label={'Humle'} values={filterState.hops} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem id={'yeasts'} label={'Jäst'} filter={filterState.yeasts} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'yeasts'} label={'Jäst'} values={filterState.yeasts} onUpdate={onUpdate} />
                </SearchFilterListItem>
            </div>

            <ResponsiveFooter handleDrawerToggle={handleDrawerToggle}/>
        </div>
    );
}

export default SearchFilter;