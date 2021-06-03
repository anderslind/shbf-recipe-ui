import React, {useState} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
}));

function FacetInput() {
    const classes = useStyles();
    const [state, setState] = useState({});

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const {ale, lager, neipa} = state;
    return (
        <FormControl component="fieldset" className={classes.formControl} margin={'dense'}>
            <FormLabel component="legend">Stil</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={ale} onChange={handleChange} name="ale" />}
                    label="Ale"
                />
                <FormControlLabel
                    control={<Checkbox checked={lager} onChange={handleChange} name="lager" />}
                    label="Lager"
                />
                <FormControlLabel
                    control={<Checkbox checked={neipa} onChange={handleChange} name="neipa" />}
                    label="New England IPA"
                />
            </FormGroup>
        </FormControl>
    );
}
export default FacetInput;