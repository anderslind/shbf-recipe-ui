import React, {useEffect, useState} from 'react';
import {Box, FormControl, Slider, Tooltip} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
    }
}));

function SearchFilterSlider({id, label, description, valueText, onUpdate, value, max, ...rest}) {
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
    }
    const postUpdate = () => onUpdate(id, state);

    return (
        <FormControl component="fieldset" className={classes.formControl} fullWidth={true}>
            <Box display={'flex'}>
                <Box flexGrow={0}>
                    <Tooltip title={description} placement={'right'}>
                        <Typography>
                            {label}
                        </Typography>
                    </Tooltip>
                </Box>
                <Box flexGrow={1} />
                <Box>
                    <Typography color={'textSecondary'} variant={'caption'}>
                        {valuetext(state[0])} till {valuetext(state[1])}
                    </Typography>
                </Box>
            </Box>
            <Slider
                name="my-input"
                onChange={handleChange}
                onChangeCommitted={postUpdate}
                valueLabelDisplay="auto"
                aria-labelledby="og-range-slider"
                getAriaValueText={valuetext}
                value={state}
                max={max}
                size={'small'}
                {...rest}
            />
        </FormControl>
    );
}

export default SearchFilterSlider;