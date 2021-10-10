import React, {useEffect} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination, CircularProgress
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useLocation from "wouter/use-location";

const DEFAULT_PAGE_SIZE = 20;

const useStyles = makeStyles((theme) => ({
    table: {
        minHeight: 200,
        '& tbody': {
            cursor: 'pointer',
            '& tr:hover': {
                backgroundColor: '#eef'
            }
        },
    },
}));

function TableResultList({recipes, loading, onPageChange, onRowsPerPageChange, totalCount, rowsPerPage, page}) {
    const classes = useStyles();

    const rows = recipes.recipeSummaries;
    const [, setLocation] = useLocation();

    useEffect(() => {
        onRowsPerPageChange(DEFAULT_PAGE_SIZE);
    }, []);

    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        onRowsPerPageChange(event.target.value);
    };

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }

    return (
        <>
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
                                {/*<TableCell style={{ width: 60 }} align="right">IBU</TableCell>*/}
                                {/*<TableCell style={{ width: 60 }} align="right">Färg</TableCell>*/}
                                {/*<TableCell style={{ width: 60 }} align="right">Pla</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading &&
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress className={classes.skeleton} />
                                    </TableCell>
                                </TableRow>
                            }
                            {
                                !loading && rows.length === 0 &&
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Inga resultat
                                        </TableCell>
                                    </TableRow>
                            }
                            {!loading && rows.map((row) => {
                                return (
                                    <TableRow key={row.id} onClick={() => handleClick(row.id)}>
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">{row.style}</TableCell>
                                        {/*<TableCell align="right">{row.size}</TableCell>*/}
                                        <TableCell style={{ width: 60 }} align="right">{row.og}</TableCell>
                                        <TableCell style={{ width: 60 }} align="right">{row.fg}</TableCell>
                                        <TableCell style={{ width: 60 }} align="right">{row.abv.toFixed(1)}</TableCell>
                                        {/*<TableCell style={{ width: 60 }} align="right">{row.ibu.toFixed(0)}</TableCell>*/}
                                        {/*<TableCell style={{ width: 60 }} align="right"><ColorIcon ebc={row.ebc} size="small" /></TableCell>*/}
                                        {/*<TableCell style={{ width: 60 }} align="right">{row.placing}</TableCell>*/}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page >= 50 ? 50 : page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default TableResultList;