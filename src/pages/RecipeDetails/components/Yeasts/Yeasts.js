import {Box, Table, TableBody, TableCell as MuiTableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import RecipeDetailHeader from "../RecipeDetailHeader/RecipeDetailHeader";
import {CellMain, CellSecondary, TableCell} from "../../RecipeDetails";

const useStyles = makeStyles((theme) => ({
    yeasts: {
    },
}));

function Yeasts({yeasts}) {
    let rowIterator = 0;
    const classes = useStyles();

    return (
        <Box className={classes.yeasts}>
            <RecipeDetailHeader>Jäst</RecipeDetailHeader>
            <Table padding={'none'}>
                <TableBody>
                    {
                        yeasts
                            .sort((a, b) => a.fermentation_order > b.fermentation_order)
                            .map(yeast => (
                            <TableRow key={`${yeast.name}+${rowIterator}`}>
                                <TableCell>
                                    <CellMain>{yeast.name}</CellMain>
                                </TableCell>
                                <TableCell>
                                    &nbsp;
                                </TableCell>
                                <TableCell align={'right'}>
                                    <CellMain>{`${yeast.amount} ${yeast.amount_unit}`}</CellMain>
                                    <CellSecondary>{yeast.fermentation_time} {yeast.fermentation_unit}</CellSecondary>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    );
};

export default Yeasts;