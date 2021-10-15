import {Button, IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        paddingLeft: '0.5rem',
        border: '0px gray solid',
        borderBottomWidth: '1px',
        '& .MuiTypography-root': {
            border: '0px gray solid',
            borderColor: props => props.borderColor,
            borderLeftWidth: '1px',
            paddingLeft: '0.5rem',
        }
    },
    label: {
        flexGrow: 1,
    }
}));

function Header({label, onNavigateBack, onClear}) {
    const classes = useStyles({borderColor: onNavigateBack ? 'black' : 'white'});

    return (
        <div className={classes.header}>
            {
                !!onNavigateBack
                &&
                <IconButton edge="start" color="inherit" aria-label="close" size={'small'} onClick={onNavigateBack}>
                    <ArrowBack />
                </IconButton>
            }

            <Typography variant="h6" className={classes.label}>
                {label}
            </Typography>
            <Button color="primary" onClick={onClear}>
                Rensa
            </Button>
        </div>
    );
}

export default Header;