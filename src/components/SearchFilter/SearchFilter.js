import React from 'react';
import {Container} from "@material-ui/core";
import Delay from "../../utils/DelayedCallWithCancel";
import {makeStyles} from "@material-ui/core/styles";
import SearchFilterListItem from "./components/SearchFilterListItem/SearchFilterListItem";
import SearchFilterSlider from "./components/SearchFilterSlider/SearchFilterSlider";
import SearchFilterMultipleSelect from "./components/SearchFilterMultipleSelect/SearchFilterMultipleSelect";
import ResponsiveFooter from "./components/ResponsiveFooter/ResponsiveFooter";
import {useRecoilState} from "recoil";
import {recipeFilterState} from "../../state";
import {abvFormat, defaultFormat, gravityFormat} from "./utils/FormatUtils";

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
                            valueText={defaultFormat}
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
                            valueText={defaultFormat}
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