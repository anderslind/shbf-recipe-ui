import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Button, Card, CardContent, CardHeader, CircularProgress} from '@mui/material';
import Typography from '@mui/material/Typography';
import ColorIcon from '../../../../../components/ColorIcon/ColorIcon';
import useLocation from 'wouter/use-location';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: '1 1 auto',
        display: 'flex',
        '& div.MuiPaper-root': {
            marginBottom: theme.spacing(1),
        },
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    card: {
        cursor: 'pointer',
        '& .MuiCardHeader-root': {
            padding: '5px',
        },
        '& .MuiCardContent-root': {
            padding: '0px',
            paddingLeft: '1rem',
        }
    },
    stats: {
        display: "flex",
        flexWrap: 'wrap',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& div:not(:last-child)': {
            marginRight: '0.7rem',
        }
    },
    footer: {
        flexShrink: 0,
        padding: '1rem',
        textAlign: 'center',
        '& button': {
            marginLeft: theme.spacing(2)
        }
    }
}));

function CardResultList({loading, recipes, page, onPageChange, totalCount}) {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }
    const handleLoadMore = () => {
        onPageChange(page + 1);
    }
    return (
        <Box className={classes.root}>
            {
                (!!loading || recipes) &&
                recipes.map((recipeSummary) => {
                    return (
                        <Card className={classes.card} variant="outlined" key={recipeSummary.id} onClick={() => handleClick(recipeSummary.id)}>
                            <CardHeader
                                avatar={
                                    <ColorIcon size="large" />
                                }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <RadioButtonUnchecked />
                                //     </IconButton>
                                // }
                                title={recipeSummary.name}
                                subheader={recipeSummary.style}
                                titleTypographyProps={{ variant:'h6' }}
                            />
                            <CardContent>
                                <Typography className={classes.stats} variant="overline">
                                    <div><Typography color={'textSecondary'} variant={'caption'}>ABV</Typography> <b>{recipeSummary.abv}%</b></div>
                                    <div><Typography color={'textSecondary'} variant={'caption'}>OG</Typography> <b>{recipeSummary.og}</b></div>
                                    <div><Typography color={'textSecondary'} variant={'caption'}>FG</Typography> <b>{recipeSummary.fg}</b></div>
                                    {/*<div><b>IBU</b> {recipeSummary.ibu.toFixed(0)}</div>*/}
                                    {/*<div><b>EBC</b> {recipeSummary.ebc.toFixed(1)}</div>*/}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
            {
                loading
                ? <Box className={classes.footer}>
                        <CircularProgress />
                </Box>
                : <Box className={classes.footer}>
                        {
                            recipes.length < totalCount
                                ? <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleLoadMore}>
                                    {`Ladda fler`}
                                </Button>
                                : <div><b>Alla recept laddade</b></div>
                        }
                </Box>
            }
        </Box>
    );
}

export default CardResultList;