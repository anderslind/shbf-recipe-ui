import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {useRecoilValue} from "recoil";
import {loadingRecipes, recipeCount} from "../../../../state";
import {Button, CircularProgress, useMediaQuery} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    footer: {
        flexShrink: 0,
        padding: '1rem',
        textAlign: 'center',
        '& button': {
            marginLeft: theme.spacing(2)
        }
    },
    progress: {
        color: 'white'
    }
}));

function ResponsiveFooter({handleDrawerToggle}) {
    const classes = useStyles();
    const recipeCountState = useRecoilValue(recipeCount);
    const loadingRecipesState = useRecoilValue(loadingRecipes);

    const hiddenMDup = useMediaQuery(theme => theme.breakpoints.up('md'));

    return (
        hiddenMDup
        ? null
        : <div className={classes.footer}>
            <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleDrawerToggle}>
                {
                    loadingRecipesState
                        ? <CircularProgress className={classes.progress} size={'1.5rem'} />
                        : <>{`Visa ${recipeCountState} recept`}</>
                }
            </Button>
        </div>
    );
}

export default ResponsiveFooter;