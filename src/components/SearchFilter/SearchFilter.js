import React, {useContext, useState} from 'react';
import {Box, Button, Container, Grid} from "@material-ui/core";
import SearchFilterSlider from "./components/SearchFilterSlider/SearchFilterSlider";
import FacetInput from "./components/FacetInput/FacetInput";
import {EMPTY_STATE, GlobalState} from "../../global_state/store";
import Delay from "../../utils/DelayedCallWithCancel";
import {makeStyles} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: 'center',
    },
}));

const gravityFormat = (v) => v > 99 ? `1.${v}` : v < 10 ? `1.00${v}` : `1.0${v}`;
const abvFormat = (v) => v > 99 ? `${v}%` : `${v}%`;

const delay = new Delay(750);

function SearchFilter(props) {
    const classes = useStyles();
    const [, dispatch] = useContext(GlobalState);
    const [localState, setLocalState] = useState({filter: Object.assign({}, EMPTY_STATE)});

    const onUpdate = (label, value) => {
        const params = localState.filter;
        Object.assign(params, {[label]: value});
        setLocalState({filter: params});

        delay.call(() => dispatch({type: 'UPDATE_FILTER', payload: params}));
    };

    const onClear = () => {
        setLocalState({filter: Object.assign({}, EMPTY_STATE)});
        dispatch({type: 'UPDATE_FILTER', payload: Object.assign({}, EMPTY_STATE)});
    }

    return (
        <Container>
            <FacetInput />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <SearchFilterSlider
                        label={'og'}
                        max={200}
                        valueText={gravityFormat}
                        onUpdate={onUpdate}
                        value={localState.filter.og}
                    />
                    <SearchFilterSlider
                        label={'abv'}
                        max={15}
                        step={0.1}
                        valueText={(v) => v > 99 ? `${v}%` : `${v}%`}
                        onUpdate={onUpdate}
                        value={localState.filter.abv}
                    />
                </Grid>
                <Grid item xs={6}>
                    <SearchFilterSlider
                        label={'fg'}
                        max={50}
                        valueText={gravityFormat}
                        onUpdate={onUpdate}
                        value={localState.filter.fg}
                    />
                    <SearchFilterSlider
                        label={'ibu'}
                        max={80}
                        valueText={(v) => v > 99 ? `${v}` : `${v}`}
                        onUpdate={onUpdate}
                        value={localState.filter.ibu}
                    />
                </Grid>
            </Grid>
            <Box className={classes.footer}>
                <Hidden mdUp>
                    <Button onClick={() => props.handleDrawerToggle()} color="primary">Filtrera</Button>
                </Hidden>
                <Button onClick={onClear}>Rensa</Button>
            </Box>
        </Container>
    );
}

export default SearchFilter;