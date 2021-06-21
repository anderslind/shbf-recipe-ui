import React from 'react';
import {Button, Container} from "@material-ui/core";
import Delay from "../../utils/DelayedCallWithCancel";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import SearchFilterListItem from "./components/SearchFilterListItem/SearchFilterListItem";
import SearchFilterSlider from "./components/SearchFilterSlider/SearchFilterSlider";
import SearchFilterMultipleSelect from "./components/SearchFilterMultipleSelect/SearchFilterMultipleSelect";
import ResponsiveFooter from "./components/ResponsiveFooter/ResponsiveFooter";
import {useRecoilState, useRecoilValue} from "recoil";
import {recipeCountState, recipeFilterState} from "../../state";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    content: {
        flexGrow: 1
    }
}));

const gravityFormat = (v) => v > 99 ? `1.${v}` : v < 10 ? `1.00${v}` : `1.0${v}`;
const abvFormat = (v) => v > 99 ? `${v}%` : `${v}%`;
const format = (v) => v;

export const delay = new Delay(400);

function SearchFilter({handleDrawerToggle}) {
    const classes = useStyles();
    const [filterState, setFilterState] = useRecoilState(recipeFilterState);

    const onUpdate = (id, value) => {
        delay.call(() =>
            setFilterState((originalFilterState) => ({
                ...originalFilterState,
                [id]: value
            }))
        );
    };

    // const text = ['Kg', 'Alfasyra', 'Domartävling, placering', 'Folkets val, placering'];
    // const select = ['År', 'Tävling/träff', 'Typ', 'Mäskningsmetod', 'Extrakt',];
    // const complex = ['Vattenbehandling',  'Humle', 'Jäst'];

    return (
        <div className={classes.root} displayname={'SearchFilter'}>

            <div className={classes.content}>
                <SearchFilterListItem
                    listKey={'vitals'}
                    id={['og', 'fg', 'ibu', 'abv', 'size']}
                    label={'Vitalparametrar'}
                    handleDrawerToggle={handleDrawerToggle}>
                    <Container style={{marginTop: '1rem'}}>
                        <SearchFilterSlider
                            id={'og'}
                            label={'OG'}
                            max={200}
                            valueText={gravityFormat}
                            onUpdate={onUpdate}
                            value={[...filterState.og]}
                        />
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
                            id={'size'}
                            label={'Storlek'}
                            max={50}
                            valueText={format}
                            onUpdate={onUpdate}
                            value={filterState.size.slice()}
                        />
                        <SearchFilterSlider
                            id={'fg'}
                            label={'FG'}
                            max={50}
                            valueText={gravityFormat}
                            onUpdate={onUpdate}
                            value={filterState.fg.slice()}
                        />
                        <SearchFilterSlider
                            id={'ibu'}
                            label={'IBU'}
                            max={80}
                            valueText={format}
                            onUpdate={onUpdate}
                            value={filterState.ibu.slice()}
                        />
                    </Container>
                </SearchFilterListItem>

                <SearchFilterListItem listKey={'style'} id={'style'} label={'Stil'} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'style'} label={'Stil'} values={filterState.style} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem listKey={'hops'} id={'hops'} label={'Humle'} filter={filterState.hops} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'hops'} label={'Humle'} values={filterState.hops} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem listKey={'yeast'} id={'yeast'} label={'Jäst'} filter={filterState.yeast} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'yeast'} label={'Jäst'} values={filterState.yeast} onUpdate={onUpdate} />
                </SearchFilterListItem>
            </div>

            <ResponsiveFooter handleDrawerToggle={handleDrawerToggle}/>
        </div>
    );
}

export default SearchFilter;