import React, {useEffect, useState} from 'react';
import {Box, FormControl, Slider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
    }
}));

function SearchFilterSlider({id, label, valueText, onUpdate, value, max, ...rest}) {
    const classes = useStyles();

    const [state, setState] = useState(value);

    useEffect(() => {
        setState(value.length === 0 ? [0, max] : value);
    }, [value, max]);

    const valuetext = (value) => {
        return valueText(value);
    }

    const handleChange = (event, value) => {
        setState(value);
        onUpdate(id, value);
    }
    return (
        <FormControl component="fieldset" className={classes.formControl} fullWidth={true}>
            <Box display={'flex'}>
                <Box flexGrow={1}>
                    <Typography>
                        {label}
                    </Typography>
                </Box>
                <Box>
                    <Typography color={'textSecondary'} variant={'caption'}>
                        {valuetext(state[0])} till {valuetext(state[1])}
                    </Typography>
                </Box>
            </Box>
            <Slider
                name="my-input"
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="og-range-slider"
                getAriaValueText={valuetext}
                value={state}
                max={max}
                {...rest}
            />
        </FormControl>
    );
}

export default SearchFilterSlider;