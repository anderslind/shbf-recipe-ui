import makeStyles from "@mui/styles/makeStyles";
import {Box, Container} from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
    fixed: {
        position: 'fixed',
        backgroundColor: '#fff',
        width: '100%',
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
}));

function FixedBar ({showFixed}) {
    const classes = useStyles();

    return (
        <Box className={`${classes.fixed} ${showFixed ? classes.show : ''}`}>
            <Container maxWidth={'lg'} className={classes.actionContainer}>
                Hep
                Hep
                Hep

            </Container>
        </Box>
    )
}

export default FixedBar;