import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {div, Card, CardContent, CardHeader, IconButton, Box, Button, CircularProgress} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {RadioButtonUnchecked} from '@material-ui/icons';
import ColorIcon from '../../../../../components/ColorIcon/ColorIcon';
import useLocation from 'wouter/use-location';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        '& div.MuiPaper-root': {
            marginBottom: theme.spacing(1),
        },
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

function CardResultList(props) {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    const {loading, recipes, page, onPageChange} = props;

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }
    const handleLoadMore = () => {
        onPageChange(page + 1);
    }
    return (
        <Box className={classes.root}>
            {
            recipes &&
            recipes.map((recipeSummary) => (
                <Card className={classes.card} variant="outlined" key={recipeSummary.id} onClick={() => handleClick(recipeSummary.id)}>
                    <CardHeader
                        avatar={
                            <ColorIcon ebc={/*recipeSummary.ebc*/12} size="large" />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <RadioButtonUnchecked />
                            </IconButton>
                        }
                        title={recipeSummary.name}
                        subheader={recipeSummary.style}
                        titleTypographyProps={{ variant:'h6' }}
                    />
                    <CardContent>
                        <Typography className={classes.stats} variant="overline">
                            <div><b>ABV</b> {recipeSummary.abv}%</div>
                            <div><b>OG</b> {recipeSummary.og.toFixed(3)}</div>
                            <div><b>FG</b> {recipeSummary.fg.toFixed(3)}</div>
                            {/*<div><b>IBU</b> {recipeSummary.ibu.toFixed(0)}</div>*/}
                            {/*<div><b>EBC</b> {recipeSummary.ebc.toFixed(1)}</div>*/}
                        </Typography>
                        <Typography className={classes.stats} variant="overline">
                            <div><b>Placering</b> {/*recipeSummary.placing*/}</div>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {
                loading && <CircularProgress />
            }
             <div className={classes.footer}>
                 {
                     recipes.length < props.totalCount
                     ? <Button size={'small'} variant={'contained'} color={'primary'} onClick={handleLoadMore}>
                             {`Ladda fler`}
                         </Button>
                     : <div><b>All recept laddade</b></div>
                 }
            </div>
        </Box>
    );
}

export default CardResultList;