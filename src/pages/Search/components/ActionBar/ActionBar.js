import {Box, CircularProgress, Divider, IconButton, Tooltip, Typography, useMediaQuery} from "@mui/material";
import {Apps, FilterList, TableChart} from "@mui/icons-material";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import {useRecoilState, useRecoilValue} from "recoil";
import {filterVisible, loadingRecipes, recipeCount} from "../../../../state";
import DemoButton from "../../../../components/DemoButton/DemoButton";

const useStyles = makeStyles((theme) => ({
    actionFilterFiller: {

    },
    actionLeft: {
        flex: '1 1 auto',
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
        alignContent: 'stretch',
        alignItems: 'center',
    },
    actionRight: {
        display: 'flex',
        flex: '0 0 auto'
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
}
}));

function ActionBar({setShowFilter, setShowTable, showTable}) {
    const classes = useStyles();

    const recipeCountState = useRecoilValue(recipeCount);
    const loadingRecipesState = useRecoilValue(loadingRecipes);

    const [filterVisibleState, setFilterVisibleState] = useRecoilState(filterVisible);

    const mdUP = useMediaQuery(theme => theme.breakpoints.up('md'));
    const hiddenSMdown = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <>
            {
                mdUP
                &&
                <Box className={classes.actionFilterFiller}>
                    <IconButton onClick={() => setFilterVisibleState(!filterVisibleState)} size="large">
                        <FilterList color={filterVisibleState ? 'primary' : 'secondary'} />
                    </IconButton>
                    <Typography
                        color={'textSecondary'}
                        variant={'caption'}
                        onClick={() => setFilterVisibleState(!filterVisibleState)}
                        style={{cursor: 'pointer'}}
                    >
                        Filter
                    </Typography>
                </Box>
            }
            <Box className={classes.actionLeft} style={{justifyContent: 'center'}}>
                <Typography variant={'caption'} color={'textSecondary'}>
                    { loadingRecipesState ? <CircularProgress size={'0.5rem'} /> : recipeCountState } recept funna
                </Typography>
            </Box>
            {
                hiddenSMdown
                    ? null
                    : <Box className={classes.actionRight}>
                        <DemoButton />
                        <Divider orientation="vertical" flexItem className={classes.divider}/>
                        <Tooltip title="Visa tabell">
                            <IconButton onClick={() => setShowTable(true)} size="large">
                                <TableChart color={showTable ? 'primary' : 'secondary'} />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" flexItem className={classes.divider}/>
                        <Tooltip title="Visa kort">
                            <IconButton onClick={() => setShowTable(false)} size="large">
                                <Apps  color={!showTable ? 'primary' : 'secondary'} />
                            </IconButton>
                        </Tooltip>
                    </Box>
            }
        </>
    );
}

export default ActionBar;