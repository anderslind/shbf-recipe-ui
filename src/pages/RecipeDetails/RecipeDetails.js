import React, {useEffect, useState} from "react";
import makeStyles from '@mui/styles/makeStyles';
import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText, Stack, TableCell as MuiTableCell,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {useLocation, useRoute} from "wouter";
// import RecipeServiceMock from "../../services/RecipeService/RecipeServiceMock";
import RecipeDialogTitle from "./components/RecipeDialogTitle/RecipeDialogTitle";
import Vitals from "../../components/Vitals/Vitals";
import Hops from "./components/Hops/Hops";
import Fermentables from "./components/Fermentables/Fermentables";
import Yeasts from "./components/Yeasts/Yeasts";
import RecipeService from "../../services/RecipeService/RecipeService";

export const routePattern = '/recipe-details/:uuid';

const useStyles = makeStyles((theme) => ({
    recipe: {
        flexGrow: 1,
    },
    content: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
    },
    right: {
        float: 'right',
        marginLeft: theme.spacing(10),
    },
}));

export const TableCell = ({children, ...props}) => (<MuiTableCell sx={{verticalAlign: 'baseline'}} {...props}>{children}</MuiTableCell>)
export const CellMain = ({children}) => (<Typography variant={'body1'}>{children}</Typography>);
export const CellSecondary = ({children}) => (<Typography color={'textSecondary'} variant={'caption'}>{children}</Typography>);

function RecipeDetails() {
    const classes = useStyles();
    const theme = useTheme();
    const [, {uuid}] = useRoute(routePattern);
    const [, setLocation] = useLocation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [recipe, setRecipe] = useState(undefined);

    function handleClose() {
        setLocation('/');
    }

    useEffect(() => {
        RecipeService.recipes(uuid)
            .then((response) => {
                setRecipe(response)
            })
            .catch((err) => {
                console.error('Failed to fetch recipe', err);
            });
    }, [uuid]);


    const Text = ({children, ...props}) =>
        <Typography  variant={'body1'} gutterBottom {...props}>
            {children}
        </Typography>

    const CenterText = ({children, ...props}) => <Text variant={'body1'} align={'center'} {...props}>{children}</Text>

    const RecipeDetailsPart = ({children, sx, ...props}) => {
        const sxx = {marginBottom: '1rem', '& > *': {marginBottom: '1rem'}};

        return (
            <Box sx={{...sxx, ...sx}} {...props}>
                {children}
            </Box>
        );
    };
    return (
        <Dialog
            className={classes.recipe}
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'lg'}
            open={true}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby={`Recept för ${recipe && recipe.name}`}
        >
            {
                recipe === undefined
                ? <RecipeDialogTitle
                        title={'Fann inget recept'}
                        handleClose={handleClose} />
                : <>
                        <RecipeDialogTitle
                            handleClose={handleClose}
                            title={`${recipe.name} ${recipe.abv}%`}
                        />
                        <DialogContent dividers={true} className={classes.content}>

                            <DialogContentText sx={{marginBottom: theme.spacing(4)}}>
                                <CenterText sx={{fontStyle: 'italic'}}>
                                    {recipe.description}
                                </CenterText>
                            </DialogContentText>

                            <Stack
                                direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                sx={{display: 'flex', justifyContent: 'space-evenly'}}
                            >
                                <RecipeDetailsPart sx={{flexGrow: 1, maxWidth: '35rem'}}>
                                    <Vitals recipe={recipe} vertical/>
                                    <Hops hops={recipe.hop} />
                                    <Fermentables fermentables={recipe.fermentable} />
                                    <Yeasts yeasts={recipe.yeast} />
                                </RecipeDetailsPart>
                            </Stack>
                        </DialogContent>
                </>
            }
        </Dialog>
    );
}

export default RecipeDetails;