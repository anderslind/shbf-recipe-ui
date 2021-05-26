import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({

}));
/*
    Namn,
    Stil,
    Storlek,
    OG,
    FG,
    IBU,
    Färg,
    ABV,
    Placering,
    Visningar
* */
function CardResultList(props) {
    const classes = useStyles();
    const rows = props.rows;

    return (
        <div>
            {rows.map((row) => (
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {row.style}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {row.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}

export default CardResultList;