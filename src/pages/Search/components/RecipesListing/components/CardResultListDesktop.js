import React, {useEffect} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {Card, CardContent, CardHeader, Button, CircularProgress, Grid, Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import ColorIcon from '../../../../../components/ColorIcon/ColorIcon';
import useLocation from 'wouter/use-location';

const DEFAULT_PAGE_SIZE = 99;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: '1 1 auto',
        '& div.MuiPaper-root': {
            marginBottom: theme.spacing(1),
        },
        '& .MuiGrid-item': {
            border: '#ddd solid 0px',
            borderRightWidth: 1,
            borderBottomWidth: 1,
            padding: theme.spacing(5),
        },
        [theme.breakpoints.down('md')]: {
            '&  .MuiGrid-item:nth-of-type(2n)': {
                borderRightWidth: 0,
            }
        },
        [theme.breakpoints.up('md')]: {
            '&  .MuiGrid-item:nth-of-type(3n)': {
                borderRightWidth: 0,
            }
        },
    },
    gridCell: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee',
        },
    },
    card: {
        backgroundColor: 'transparent',
        borderWidth: 0,
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
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        '& :not(:last-child)': {
            marginRight: theme.spacing(1),
        },
        marginBottom: theme.spacing(1)
    },
    header: {
        textAlign: 'left',
    },
    progress: {

    },
    footer: {
        padding: '1rem',
        '& button': {
            marginLeft: theme.spacing(2)
        }
    },
    italic: {
        fontStyle: 'italic',
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

    const vitals = [
        {accessor: 'abv', suffix: '%'},
        {accessor: 'og'},
        {accessor: 'fg'},
    ];
    return (
        <Box className={classes.root}>
            {
                ((!!loading && recipes.length === 0) || recipes.length > 0)
                &&
                <Grid container spacing={0} className={classes.grid}>
                    {
                        recipes.map((recipeSummary) => {
                            return (
                                <Grid item sm={6} md={4} key={recipeSummary.id} onClick={() => handleClick(recipeSummary.id)} className={classes.gridCell}>
                                    <Card className={classes.card} variant="outlined">
                                        <CardHeader
                                            avatar={
                                                <ColorIcon size="large"/>
                                            }
                                            // action={
                                            //     <IconButton aria-label="settings">
                                            //         <RadioButtonUnchecked />
                                            //     </IconButton>
                                            // }
                                            title={recipeSummary.name}
                                            subheader={recipeSummary.style}
                                            titleTypographyProps={{variant: 'h5'}}
                                            className={classes.header}
                                        />
                                        <CardContent>
                                            <Box className={classes.stats}>
                                                {
                                                    vitals
                                                        .map((vital) => (
                                                            <>
                                                                <Typography color={'textSecondary'} variant={'overline'}>{vital.accessor}</Typography>
                                                                <Typography variant={'h6'}>{recipeSummary[vital.accessor]}{vital?.suffix}</Typography>
                                                            </>
                                                    ))
                                                }
                                            </Box>
                                            <Box className={classes.stats}>
                                                <Typography color={'textSecondary'} variant={'body1'} className={classes.italic}>"En stor stark..."</Typography>
                                            </Box>
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
                : <Box className={classes.footer}>
                        {
                            recipes.length < totalCount
                                ? <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleLoadMore}>
                                    {`Ladda fler`}
                                </Button>
                                : <b>Alla recept laddade</b>
                        }
                  </Box>
            }
        </Box>
    );
}

export default CardResultListDesktop;