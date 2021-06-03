import React from 'react';
import {Container, Grid} from "@material-ui/core";
import SearchFilterSlider from "./components/SearchFilterSlider/SearchFilterSlider";
import FacetInput from "./components/FacetInput/FacetInput";

const gravityFormat = (v) => v > 99 ? `1.${v}` : v < 10 ? `1.00${v}` : `1.0${v}`

function SearchFilter() {
    return (
        <Container>
            <FacetInput />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <SearchFilterSlider
                        label={'OG'}
                        max={200}
                        valueText={gravityFormat}
                    />
                    <SearchFilterSlider
                        label={'ABV'}
                        max={15}
                        step={0.1}
                        valueText={(v) => v > 99 ? `${v}%` : `${v}%`}
                    />
                </Grid>
                <Grid item xs={6}>
                    <SearchFilterSlider
                        label={'FG'}
                        max={50}
                        valueText={gravityFormat}
                    />
                    <SearchFilterSlider
                        label={'IBU'}
                        max={80}
                        valueText={(v) => v > 99 ? `${v}` : `${v}`}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default SearchFilter;