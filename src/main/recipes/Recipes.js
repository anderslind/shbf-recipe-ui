import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableResultList from "./components/TableResultList";
import Hidden from "@material-ui/core/Hidden";
import CardResultList from "./components/CardResultList";

const useStyles = makeStyles((theme) => ({
    recipes: {
        flexGrow: 1,
    },
}));

function createData(name, style, size, og, fg, abv, ibu, ebc, placing, views) {
    return { name, style, size, og, fg, abv, ibu, ebc, placing, views};
}

const rows = [
    createData('Nisses Enkla', 'APA',24, 1.055, 1.009, 5.5, 20, 5, 23, 345),
    createData('Sigges Strong Ale', 'Ale',24, 1.075, 1.013, 7.5, 50, 18, 2, 5),
    createData('A fantastic travel American Pale Ale *Citra Special Edition*', 'Ale',18, 1.055, 1.011, 6.5, 51.6, 30, 125, 1345),
    createData('Port of Call', 'Porter',18, 1.070, 1.011, 7.2, 45.6, 45, 56, 945),
    createData('Beware of the Dark', 'Stout',18, 1.070, 1.011, 7.2, 45.6, 65.2, 12, 1345),
];

function Recipes(props) {
    const classes = useStyles();

    return (
        <div className={classes.recipes}>
            <Hidden xsDown>
                <TableResultList rows={rows} />
            </Hidden>
            <Hidden smUp>
                <CardResultList rows={rows} />
            </Hidden>
        </div>
    );
}

export default Recipes;