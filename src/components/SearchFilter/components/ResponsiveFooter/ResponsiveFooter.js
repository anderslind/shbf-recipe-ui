import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {useRecoilValue} from "recoil";
import {loadingRecipes, recipeCount} from "../../../../state";
import {Button, CircularProgress} from "@mui/material";
import Hidden from "@mui/material/Hidden";

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

    return (
        <Hidden mdUp>
            <div className={classes.footer}>
                <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleDrawerToggle}>
                    {
                        loadingRecipesState
                            ? <CircularProgress className={classes.progress} size={'1.5rem'} />
                            : <>{`Visa ${recipeCountState} recept`}</>
                    }
                </Button>
            </div>
        </Hidden>
    );
}

export default ResponsiveFooter;