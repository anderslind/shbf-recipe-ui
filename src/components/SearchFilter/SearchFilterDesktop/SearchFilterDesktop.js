import {Box} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import SearchFilterListItemDesktop from "./components/SearchFilterListItemDesktop";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {recipeFilter} from "../../../state";
import SearchFilterSlider from "../components/SearchFilterSlider/SearchFilterSlider";
import {abvFormat, defaultFormat} from "../utils/FormatUtils";
import SearchFilterMultipleSelect from "../components/SearchFilterMultipleSelect/SearchFilterMultipleSelect";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        '& .MuiAccordion-root.Mui-expanded:first-child': {
            borderTopWidth: '0px',
        },
        '& .MuiAccordion-root.Mui-expanded': {
            '& :first-child': {
                borderTopWidth: '0px !important',
            },
            border: '0px solid #ddd',
            borderBottomWidth: '1px',
            borderTopWidth: '1px',
        },
    },
}));

function SearchFilterDesktop() {
    const classes = useStyles();
    const [filterState, setFilterState] = useRecoilState(recipeFilter);

    const [expanded, setExpanded] = useState('');

    const onUpdate = (id, value) => {
        setFilterState((originalFilterState) => ({
            ...originalFilterState,
            [id]: value
        }))
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box className={classes.root} displayname={'SearchFilterDesktop'}>
            <SearchFilterListItemDesktop
                expandId={'vitals'}
                id={['og', 'fg', 'ibu', 'abv', 'size']}
                label={'Vitalparametrar'}
                expanded={expanded}
                handleExpanded={handleChange}>

                    <SearchFilterSlider
                        id={'og'}
                        label={'OG'}
                        description={'Original Gravity'}
                        max={200}
                        valueText={defaultFormat}
                        onUpdate={onUpdate}
                        value={[...filterState.og]}
                    />
                    <SearchFilterSlider
                        id={'abv'}
                        label={'ABV'}
                        description={'Volymprocent alkohol'}
                        max={15}
                        step={0.5}
                        valueText={abvFormat}
                        onUpdate={onUpdate}
                        value={filterState.abv.slice()}
                    />
                    <SearchFilterSlider
                        id={'size'}
                        label={'Storlek'}
                        description={'Storlek'}
                        max={50}
                        valueText={defaultFormat}
                        onUpdate={onUpdate}
                        value={filterState.size.slice()}
                    />
                    <SearchFilterSlider
                        id={'fg'}
                        label={'FG'}
                        description={'Final gravity'}
                        max={50}
                        valueText={defaultFormat}
                        onUpdate={onUpdate}
                        value={filterState.fg.slice()}
                    />
                    <SearchFilterSlider
                        id={'ibu'}
                        label={'IBU'}
                        description={'International Bitterness Unit'}
                        max={80}
                        valueText={defaultFormat}
                        onUpdate={onUpdate}
                        value={filterState.ibu.slice()}
                    />
            </SearchFilterListItemDesktop>

            <SearchFilterListItemDesktop id={'fermentables'} expandId={'fermentables'} label={'Jäsbara ingredienser'} filter={filterState.fermentables} expanded={expanded} handleExpanded={handleChange}>
                <SearchFilterMultipleSelect id={'fermentables'} label={'Jäsbara'} values={filterState.fermentables} onUpdate={onUpdate} />
            </SearchFilterListItemDesktop>

            <SearchFilterListItemDesktop id={'hops'} expandId={'hops'} label={'Humle'} filter={filterState.hops} expanded={expanded} handleExpanded={handleChange}>
                <SearchFilterMultipleSelect id={'hops'} label={'Humle'} values={filterState.hops} onUpdate={onUpdate} />
            </SearchFilterListItemDesktop>

            <SearchFilterListItemDesktop id={'yeasts'} expandId={'yeasts'} label={'Jäst'} filter={filterState.yeasts} expanded={expanded} handleExpanded={handleChange}>
                <SearchFilterMultipleSelect id={'yeasts'} label={'Jäst'} values={filterState.yeasts} onUpdate={onUpdate} />
            </SearchFilterListItemDesktop>
        </Box>
    );
}

export default SearchFilterDesktop;