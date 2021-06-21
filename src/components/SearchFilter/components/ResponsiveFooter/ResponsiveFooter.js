import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilValue} from "recoil";
import {recipeCountState} from "../../../../state";
import {Button} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    footer: {
        flexShrink: 0,
        padding: '1rem',
        textAlign: 'center',
        '& button': {
            marginLeft: theme.spacing(2)
        }
    }
}));

function ResponsiveFooter({handleDrawerToggle}) {
    const classes = useStyles();
    const recipeCount = useRecoilValue(recipeCountState);

    return (
        <Hidden mdUp>
            <div className={classes.footer}>
                <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleDrawerToggle}>
                    {`Visa ${recipeCount} recept`}
                </Button>
            </div>
        </Hidden>
    );
}

export default ResponsiveFooter;