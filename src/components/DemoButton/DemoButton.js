import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {useRecoilState} from "recoil";
import {demo} from "../../state";
import {Box, Button} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        display: 'flex',
        marginRight: theme.spacing(1),
    },
    btn: {
        fontWeight: 'bold',
    }
}));

function DemoButton() {
    const classes = useStyles();

    const [demoState, setDemoState] = useRecoilState(demo);

    return (
        <Box className={classes.root}>
            <Button
                    variant={demoState ? 'contained' : 'outlined'}
                    onClick={() => setDemoState(!demoState)}
                    size={"small"}
                    color={demoState ? 'primary' : 'secondary'}
                    className={demoState ? classes.btn : ''}
                >
                mock data
            </Button>
        </Box>
    );
}

export default DemoButton;