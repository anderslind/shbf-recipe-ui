import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import RecipeDetailHeader from "../../pages/RecipeDetails/components/RecipeDetailHeader/RecipeDetailHeader";

const useStyles = makeStyles((theme) => ({
    vitals: {
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        '& :not(:last-child)': {
            marginRight: theme.spacing(1),
        },
        marginBottom: theme.spacing(1)
    }
}));

const vitals = [
    {accessor: 'batch_size', suffix: ' liter', desc: 'Batchstorlek'},
    {accessor: 'abv', suffix: '%'},
    {accessor: 'og'},
    {accessor: 'fg'},
];

function Vitals({recipe, vertical, filter}) {
    const classes = useStyles();
    const filteredVitals = filter ? vitals.filter(v => filter.includes(v.accessor)) : vitals;

    return (
        <Box className={classes.vitals} sx={vertical ? {flexDirection: 'column'}:{flexDirection: 'row'}}>
            {
                filteredVitals
                    .map((vital) => (
                        <Box key={`${recipe.id}-${vital.accessor}`} sx={{display: 'flex', alignItems: 'baseline'}}>
                            <RecipeDetailHeader sx={vertical ? {minWidth: '8rem'}:{}}>{vital.desc ? vital.desc : vital.accessor}</RecipeDetailHeader>
                            <Typography variant={'h6'}>{recipe[vital.accessor]}{vital?.suffix}</Typography>
                        </Box>
                    ))
            }
        </Box>
    );
};

export default Vitals;