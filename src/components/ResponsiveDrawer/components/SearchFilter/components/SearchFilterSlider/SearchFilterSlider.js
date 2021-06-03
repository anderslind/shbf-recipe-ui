import React, {useState} from 'react';
import {Box, FormControl, Slider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
    }
}));

function SearchFilterSlider(props) {
    const classes = useStyles();
    const {start, end, label, valueText, ...rest} = props;
    const [value, setValue] = useState([0, props.max]);

    const valuetext = (value) => {
        return valueText(value);
    }

    const handleChange = (event, value) => {
        setValue(value);
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
                        {valuetext(value[0])} till {valuetext(value[1])}
                    </Typography>
                </Box>
            </Box>
            <Slider
                name="my-input"
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="og-range-slider"
                getAriaValueText={valuetext}
                {...rest}
            />
        </FormControl>
    );
}

export default SearchFilterSlider;