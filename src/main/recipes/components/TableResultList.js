import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 450,
    },
}));

function TableResultList(props) {
    const classes = useStyles();
    const rows = props.rows;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="Sökresultat">
                <TableHead>
                    <TableRow>
                        <TableCell>Namn</TableCell>
                        <TableCell align="right">Stil</TableCell>
                        <TableCell align="right">Storlek</TableCell>
                        <TableCell style={{ width: 60 }} align="right">OG</TableCell>
                        <TableCell style={{ width: 60 }} align="right">FG</TableCell>
                        <TableCell style={{ width: 60 }} align="right">ABV</TableCell>
                        <TableCell style={{ width: 60 }} align="right">IBU</TableCell>
                        <TableCell style={{ width: 60 }} align="right">Färg</TableCell>
                        <TableCell style={{ width: 60 }} align="right">Pla</TableCell>
                        <TableCell align="right">Vis</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="right">{row.style}</TableCell>
                            <TableCell align="right">{row.size}</TableCell>
                            <TableCell style={{ width: 60 }} align="right">{row.og}</TableCell>
                            <TableCell style={{ width: 60 }} align="right">{row.fg}</TableCell>
                            <TableCell style={{ width: 60 }} align="right">{row.abv}</TableCell>
                            <TableCell style={{ width: 60 }} align="right">{row.ibu}</TableCell>
                            <TableCell style={{ width: 60 }} align="right">{row.color}</TableCell>
                            <TableCell style={{ width: 60 }} align="right">{row.placing}</TableCell>
                            <TableCell align="right">{row.views}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableResultList;