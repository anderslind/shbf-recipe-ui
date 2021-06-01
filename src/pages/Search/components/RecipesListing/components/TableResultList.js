import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ColorIcon from "../../../../../components/ColorIcon";
import useLocation from "wouter/use-location";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 450,
        '& tbody': {
            cursor: 'pointer',
        }
    },
}));

function TableResultList(props) {
    const classes = useStyles();
    const rows = props.recipes;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [, setLocation] = useLocation();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }

    return (
        <>
            <Box>Sökträffar 1230</Box>
            <Paper className={classes.table}>
                <TableContainer>
                    <Table className={classes.table} size="small" aria-label="Sökresultat">
                        <TableHead>
                            <TableRow>
                                <TableCell>Namn</TableCell>
                                <TableCell align="right">Stil</TableCell>
                                {/*<TableCell align="right">Storlek</TableCell>*/}
                                <TableCell style={{ width: 60 }} align="right">OG</TableCell>
                                <TableCell style={{ width: 60 }} align="right">FG</TableCell>
                                <TableCell style={{ width: 60 }} align="right">ABV</TableCell>
                                <TableCell style={{ width: 60 }} align="right">IBU</TableCell>
                                <TableCell style={{ width: 60 }} align="right">Färg</TableCell>
                                <TableCell style={{ width: 60 }} align="right">Pla</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} onClick={() => handleClick(row.uuid)}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.style}</TableCell>
                                    {/*<TableCell align="right">{row.size}</TableCell>*/}
                                    <TableCell style={{ width: 60 }} align="right">{row.og}</TableCell>
                                    <TableCell style={{ width: 60 }} align="right">{row.fg}</TableCell>
                                    <TableCell style={{ width: 60 }} align="right">{row.abv}</TableCell>
                                    <TableCell style={{ width: 60 }} align="right">{row.ibu}</TableCell>
                                    <TableCell style={{ width: 60 }} align="right"><ColorIcon ebc={row.ebc} size="small" /></TableCell>
                                    <TableCell style={{ width: 60 }} align="right">{row.placing}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default TableResultList;