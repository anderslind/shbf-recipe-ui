import {Box, Table, TableBody, TableCell as MuiTableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import RecipeDetailHeader from "../RecipeDetailHeader/RecipeDetailHeader";

const useStyles = makeStyles((theme) => ({
    hops: {
        display: 'flex',
        alignItems: 'baseline'
    },
}));
const TableCell = ({children, ...props}) => (<MuiTableCell sx={{verticalAlign: 'baseline'}} {...props}>{children}</MuiTableCell>)
const CellMain = ({children}) => (<Typography>{children}</Typography>);
const CellSecondary = ({children}) => (<Typography color={'textSecondary'} variant={'subtitle2'}>{children}</Typography>);

function Hops({hops}) {
    let rowIterator = 0;
    const classes = useStyles();

    return (
        <Box className={classes.hops}>
            <RecipeDetailHeader sx={{minWidth: '8rem'}}>Humle</RecipeDetailHeader>
            <Table padding={'none'}>
                <TableBody>
                    {
                        hops.map(hop => (
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