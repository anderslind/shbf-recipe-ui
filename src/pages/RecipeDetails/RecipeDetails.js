import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, div, Grid, IconButton, Typography,
    useMediaQuery, useTheme
} from "@material-ui/core";
import { useLocation} from "wouter";
import RecipeService from "../../services/RecipeService/RecipeServiceMock";
import {Close} from "@material-ui/icons";

export const routePattern = '/recipe-details/:uuid';

const useStyles = makeStyles((theme) => ({
    recipe: {
        flexGrecipe: 1,
    },
}));

function RecipeDetails(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [, setLocation] = useLocation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    function handleClose() {
        setLocation('/');
    }

    const recipe = RecipeService.load('71fdd733-2799-43d4-b2ef-5e41fc82902d');

    return (
        <Dialog
            className={classes.recipe}
            fullScreen={fullScreen}
            fullWidth={true}
            open={true}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby={`Recept för ${recipe.name}`}
        >
            <DialogTitle id="responsive-dialog-title">
                <Grid
                    justify="space-between" // Add it here :)
                    container
                    spacing={2}
                >
                    <Grid item>
                        <Typography variant="h6" noWrap>
                            {recipe.name}&nbsp;{recipe.abv}%
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers={'paper'}>
                <DialogContentText>
                    <Typography className={classes.stats} variant="overline">
                        <div><b>ABV</b> {recipe.abv}%</div>
                        <div><b>OG</b> {recipe.og}</div>
                        <div><b>FG</b> {recipe.fg}</div>
                        <div><b>IBU</b> {recipe.ibu}</div>
                    </Typography>
                    <Typography className={classes.stats} variant="overline">
                        <div><b>Placering</b> {recipe.placing}</div>
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default RecipeDetails;