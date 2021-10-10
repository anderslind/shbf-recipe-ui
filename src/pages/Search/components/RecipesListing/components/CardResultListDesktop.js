import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, Button, CircularProgress, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ColorIcon from '../../../../../components/ColorIcon/ColorIcon';
import useLocation from 'wouter/use-location';

const DEFAULT_PAGE_SIZE = 99;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 1 auto',
        textAlign: 'center',
        '& div.MuiPaper-root': {
            marginBottom: theme.spacing(1),
        },
        '& .MuiGrid-item': {
            border: '0px solid #ddd',
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            padding: theme.spacing(5),
        }
    },
    grid: {

    },
    card: {
        border: '#fff solid 0px',
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
        '& div:not(:last-child)': {
            marginRight: '0.7rem',
        }
    },
    header: {
        textAlign: 'left',
    },
    footer: {
        flex: '1 1 auto',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '1rem',
        '& button': {
            marginLeft: theme.spacing(2)
        }
    }
}));

function CardResultListDesktop({loading, recipes, page, onPageChange, totalCount, onRowsPerPageChange}) {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }
    const handleLoadMore = () => {
        onPageChange(page + 1);
    }
    useEffect(() => {
        onRowsPerPageChange(DEFAULT_PAGE_SIZE);
    }, []);

    return (
        <div className={classes.root}>
            {
                ((!!loading && recipes.length === 0) || recipes.length > 0)
                &&
                <Grid container spacing={0} className={classes.grid}>
                    {
                        recipes.map((recipeSummary) => {
                            return (
                                <Grid item xs={6} sm={4} key={recipeSummary.id}>
                                    <Card className={classes.card} variant="outlined"
                                          onClick={() => handleClick(recipeSummary.id)}>
                                        <CardHeader
                                            avatar={
                                                <ColorIcon ebc={/*recipeSummary.ebc*/12} size="large"/>
                                            }
                                            // action={
                                            //     <IconButton aria-label="settings">
                                            //         <RadioButtonUnchecked />
                                            //     </IconButton>
                                            // }
                                            title={recipeSummary.name}
                                            subheader={recipeSummary.style}
                                            titleTypographyProps={{variant: 'h6'}}
                                            className={classes.header}
                                        />
                                        <CardContent>
                                            <Typography className={classes.stats} variant="overline">
                                                <div><b>ABV</b> {recipeSummary.abv}%</div>
                                                <div><b>OG</b> {recipeSummary.og}</div>
                                                <div><b>FG</b> {recipeSummary.fg}</div>
                                                {/*<div><b>IBU</b> {recipeSummary.ibu.toFixed(0)}</div>*/}
                                                {/*<div><b>EBC</b> {recipeSummary.ebc.toFixed(1)}</div>*/}
                                            </Typography>
                                            <Typography className={classes.stats} variant="overline">
                                                <div><b>Placering</b> {/*recipeSummary.placing*/}</div>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            }
            {
                loading
                ? <CircularProgress />
                : <div className={classes.footer}>
                        {
                            recipes.length < totalCount
                                ? <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleLoadMore}>
                                    {`Ladda fler`}
                                </Button>
                                : <b>Alla recept laddade</b>
                        }
                  </div>
            }
        </div>
    );
}

export default CardResultListDesktop;