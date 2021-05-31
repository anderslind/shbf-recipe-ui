import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Search from "./search/Search";
import Recipes from "./recipes/Recipes";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& .MuiPaper-root': {
            marginBottom: theme.spacing(3),
        },
    },
}));

function Main(props) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth="md">
            <Search handleDrawerToggle={props.handleDrawerToggle} />
                <Recipes />
            </Container>
        </main>
    );
}

export default Main;