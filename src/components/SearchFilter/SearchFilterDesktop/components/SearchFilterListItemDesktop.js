import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import React from "react";

const useStyles = makeStyles((theme) => ({
    summary: {
        display: 'flex',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    },
    bold: {

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
    }
}));

function SearchFilterListItemDesktop({label, children, expanded, handleExpanded, id, expandId}) {
    const classes = useStyles();
    return (
        <Accordion disableGutters elevation={0} square className={classes.accordion} expanded={expanded === expandId} onChange={handleExpanded(expandId)}>
            <AccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.summary}
            >
                <Typography className={classes.bold}>{label}</Typography>

            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}

export default SearchFilterListItemDesktop;