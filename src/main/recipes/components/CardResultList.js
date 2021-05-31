import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {RadioButtonUnchecked} from "@material-ui/icons";
import ColorIcon from "../../../components/ColorIcon";

const useStyles = makeStyles((theme) => ({
    root: {
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
        '& box:not(:last-child)': {
            marginRight: '1rem',
        }
    }
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
                            <box><b>ABV</b> {row.abv}%</box>
                            <box><b>OG</b> {row.og}</box>
                            <box><b>FG</b> {row.fg}</box>
                            <box><b>IBU</b> {row.ibu}</box>
                        </Typography>
                        <Typography className={classes.stats} variant="overline">
                            <box><b>Placering</b> {row.placing}</box>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default CardResultList;