import React, {useContext} from 'react';
import {Button, Container} from "@material-ui/core";
import {GlobalState} from "../../global_state/store";
import Delay from "../../utils/DelayedCallWithCancel";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import SearchFilterListItem from "./components/SearchFilterListItem/SearchFilterListItem";
import SearchFilterSlider from "./components/SearchFilterSlider/SearchFilterSlider";
import SearchFilterMultipleSelect from "./components/SearchFilterMultipleSelect/SearchFilterMultipleSelect";
import Footer from "./components/Footer/Footer";

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

export const delay = new Delay(350);

function SearchFilter({handleDrawerToggle}) {
    const classes = useStyles();
    const [globalState, dispatch] = useContext(GlobalState);

    const onUpdate = (id, value) => {
        const params = globalState.filter;
        Object.assign(params, {[id]: value});

        delay.call(() => dispatch({type: 'UPDATE_FILTER', payload: params}));
    };

    // const text = ['Kg', 'Alfasyra', 'Domartävling, placering', 'Folkets val, placering'];
    // const select = ['År', 'Tävling/träff', 'Typ', 'Mäskningsmetod', 'Extrakt',];
    // const complex = ['Vattenbehandling',  'Humle', 'Jäst'];

    return (
        <div className={classes.root} displayname={'SearchFilter'}>

            <div className={classes.content}>
                <SearchFilterListItem
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
                            value={globalState.filter.og}
                        />
                        <SearchFilterSlider
                            id={'abv'}
                            label={'ABV'}
                            max={15}
                            step={0.5}
                            valueText={abvFormat}
                            onUpdate={onUpdate}
                            value={globalState.filter.abv}
                        />
                        <SearchFilterSlider
                            id={'size'}
                            label={'Storlek'}
                            max={50}
                            valueText={format}
                            onUpdate={onUpdate}
                            value={globalState.filter.size}
                        />
                        <SearchFilterSlider
                            id={'fg'}
                            label={'FG'}
                            max={50}
                            valueText={gravityFormat}
                            onUpdate={onUpdate}
                            value={globalState.filter.fg}
                        />
                        <SearchFilterSlider
                            id={'ibu'}
                            label={'IBU'}
                            max={80}
                            valueText={format}
                            onUpdate={onUpdate}
                            value={globalState.filter.ibu}
                        />
                    </Container>
                </SearchFilterListItem>

                <SearchFilterListItem id={'style'} label={'Stil'} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'style'} label={'Stil'} values={globalState.filter.style} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem id={'hops'} label={'Humle'} filter={globalState.filter.hops} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'hops'} label={'Humle'} values={globalState.filter.hops} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem id={'yeast'} label={'Jäst'} filter={globalState.filter.yeast} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'yeast'} label={'Jäst'} values={globalState.filter.yeast} onUpdate={onUpdate} />
                </SearchFilterListItem>
            </div>

            <Footer>
                <Hidden mdUp>
                    <Footer>
                        <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleDrawerToggle}>
                            {`Visa ${globalState.count} recept`}
                        </Button>
                    </Footer>
                </Hidden>
            </Footer>
        </div>
    );
}

export default SearchFilter;