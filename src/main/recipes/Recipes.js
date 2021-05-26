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

function createData(name, style, size, og, fg, abv, ibu, color, placing, views) {
    return { name, style, size, og, fg, abv, ibu, color, placing, views};
}

const rows = [
    createData('Nisses Enkla', 'APA','24l', '1,055', '1,009', '6,5', '51,6', '5,2', '23', '345'),
    createData('Sigges Strong Ale', 'Ale','24l', '1,055', '1,009', '6,5', '51,6', '5,2', '23', '345'),
];

function Recipes(props) {
    const classes = useStyles();

    return (
        <div className={classes.recipes}>
            <Hidden smDown>
                <TableResultList rows={rows} />
            </Hidden>
            <Hidden mdUp>
                <CardResultList rows={rows} />
            </Hidden>
        </div>
    );
}

export default Recipes;