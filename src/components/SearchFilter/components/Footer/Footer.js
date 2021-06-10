import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        flexShrink: 0,
        padding: '1rem',
        textAlign: 'center',
        '& button': {
            marginLeft: theme.spacing(2)
        }
    }
}));

function Footer({children}) {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            {children}
        </div>
    );
}

export default Footer;