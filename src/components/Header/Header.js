import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import logo from "../../static/shbf_logo.png";
import makeStyles from '@mui/styles/makeStyles';
import {Box} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    toolbar: {
        flex: '1 1 auto',
        padding: theme.spacing(3),
    },
    text: {
        flex: '1 1 auto',
        textAlign: "center"
    },
    logo: {
        width: "120px",
    },
}));

function Header() {
    const classes = useStyles();
    return (
        <Box maxWidth="md" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <img className={classes.logo} src={logo} />
                <Typography variant="h6" noWrap className={classes.text}>
                    SHBF RECEPTSÖK
                </Typography>
            </Toolbar>
        </Box>
    );
}

export default Header;