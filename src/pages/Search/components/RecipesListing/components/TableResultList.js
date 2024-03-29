import React, {useEffect} from "react";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Typography, useTheme
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import useLocation from "wouter/use-location";
import {DEFAULT_TABLE_PAGE_SIZE} from "../Recipes";

const useStyles = makeStyles((theme) => ({
    table: {
        flex: '1 1 auto',
        minHeight: 200,
        '& tbody': {
            cursor: 'pointer',
            '& tr:hover': {
                backgroundColor: '#eee'
            }
        },
    },
}));

function TableResultList({recipes, loading, onPageChange, onRowsPerPageChange, totalCount, rowsPerPage, page}) {
    const classes = useStyles();
    const theme = useTheme();

    const rows = recipes.recipeSummaries;
    const [, setLocation] = useLocation();

    useEffect(() => {
        onRowsPerPageChange(DEFAULT_TABLE_PAGE_SIZE);
    }, [onRowsPerPageChange]);

    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        onRowsPerPageChange(event.target.value);
    };

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }

    const TableCell = ({children, header, ...props}) => {
        return (
            <MuiTableCell {...props}>
                <Typography sx={{color: header ? theme.palette.secondary.main : ''}}>
                    {children}
                </Typography>
            </MuiTableCell>
        )
    };

    return <>
        <Paper className={classes.table}>
            <TableContainer>
                <Table className={classes.table} size="medium" aria-label="Sökresultat">

                    <TableHead>
                        <TableRow>
                            <TableCell header>Namn</TableCell>
                            {/*<TableCell align="right">Stil</TableCell>*/}
                            {/*<TableCell align="right">Storlek</TableCell>*/}
                            <TableCell header style={{ width: 60 }} align="right">OG</TableCell>
                            <TableCell header style={{ width: 60 }} align="right">FG</TableCell>
                            <TableCell header style={{ width: 60 }} align="right">ABV</TableCell>
                            {/*<TableCell style={{ width: 60 }} align="right">IBU</TableCell>*/}
                            {/*<TableCell style={{ width: 60 }} align="right">Färg</TableCell>*/}
                            {/*<TableCell style={{ width: 60 }} align="right">Pla</TableCell>*/}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            loading &&
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress className={classes.skeleton} />
                                </TableCell>
                            </TableRow>
                        }
                        {
                            !loading && rows.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        Inga resultat
                                    </TableCell>
                                </TableRow>
                        }
                        {!loading && rows.map((row) => {
                            return (
                                <TableRow key={row.id} onClick={() => handleClick(row.id)}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    {/*<TableCell align="right">{row.style}</TableCell>*/}
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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>;
}

export default TableResultList;