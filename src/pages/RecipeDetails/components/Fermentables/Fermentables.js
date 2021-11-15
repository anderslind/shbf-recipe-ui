import {Box, Table, TableBody, TableCell as MuiTableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import RecipeDetailHeader from "../RecipeDetailHeader/RecipeDetailHeader";
import {CellMain, CellSecondary, TableCell} from "../../RecipeDetails";

const useStyles = makeStyles((theme) => ({
    fermentables: {

    },
}));

function Fermentables({fermentables}) {
    let rowIterator = 0;
    const classes = useStyles();

    return (
        <Box className={classes.fermentables}>
            <RecipeDetailHeader>Jäsbara</RecipeDetailHeader>
            <Table padding={'none'}>
                <TableBody>
                    {
                        fermentables
                        && fermentables.map(fermentable => (
                            <TableRow key={`${fermentable.name}+${rowIterator}`}>
                                <TableCell>
                                    <CellMain>{fermentable.name}</CellMain>
                                </TableCell>
                                <TableCell>
                                    <CellMain>&nbsp;</CellMain>
                                </TableCell>
                                <TableCell align={'right'}>
                                    <CellMain>{`${fermentable.amount} ${fermentable.amount_unit}`}</CellMain>
                                    <CellSecondary>{fermentable.phase}</CellSecondary>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    );
};

export default Fermentables;