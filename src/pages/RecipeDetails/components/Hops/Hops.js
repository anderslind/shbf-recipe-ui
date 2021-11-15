import {Box, Table, TableBody, TableCell as MuiTableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import RecipeDetailHeader from "../RecipeDetailHeader/RecipeDetailHeader";
import {CellMain, CellSecondary, TableCell} from "../../RecipeDetails";

const useStyles = makeStyles((theme) => ({
    hops: {
    },
}));

function Hops({hops}) {
    let rowIterator = 0;
    const classes = useStyles();

    return (
        <Box className={classes.hops}>
            <RecipeDetailHeader>Humle</RecipeDetailHeader>
            <Table padding={'none'}>
                <TableBody>
                    {
                        hops
                        && hops.map(hop => (
                            <TableRow key={`${hop.name}+${rowIterator}`}>
                                <TableCell>
                                    <CellMain>{hop.name}</CellMain>
                                </TableCell>
                                <TableCell>
                                    <CellMain>{`${hop.amount} ${hop.amount_unit}`}</CellMain>
                                </TableCell>
                                <TableCell align={'right'}>
                                    <CellMain>{`${hop.added_at} ${hop.added_at_unit}`}</CellMain>
                                    <CellSecondary>{hop.phase}</CellSecondary>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    );
};

export default Hops;