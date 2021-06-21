import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {div, Card, CardContent, CardHeader, IconButton, Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {RadioButtonUnchecked} from "@material-ui/icons";
import ColorIcon from "../../../../../components/ColorIcon/ColorIcon";
import useLocation from "wouter/use-location";

const useStyles = makeStyles((theme) => ({
    root: {
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
    }
}));

function CardResultList(props) {
    const classes = useStyles();
    const [, setLocation] = useLocation();

    const handleClick = (id)  => {
        setLocation(`/recipe-details/${id}`);
    }

    const rows = props.recipes;

    return (
        <Box className={classes.root}>
            {rows.map((row) => (
                <Card className={classes.card} variant="outlined" key={row.uuid} onClick={() => handleClick(row.uuid)}>
                    <CardHeader
                        avatar={
                            <ColorIcon ebc={row.ebc} size="large" />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <RadioButtonUnchecked />
                            </IconButton>
                        }
                        title={row.name}
                        subheader={row.style}
                        titleTypographyProps={{ variant:'h6' }}
                    />
                    <CardContent>
                        <Typography className={classes.stats} variant="overline">
                            <div><b>ABV</b> {row.abv}%</div>
                            <div><b>OG</b> {row.og.toFixed(3)}</div>
                            <div><b>FG</b> {row.fg.toFixed(3)}</div>
                            <div><b>IBU</b> {row.ibu.toFixed(0)}</div>
                        </Typography>
                        <Typography className={classes.stats} variant="overline">
                            <div><b>Placering</b> {row.placing}</div>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default CardResultList;