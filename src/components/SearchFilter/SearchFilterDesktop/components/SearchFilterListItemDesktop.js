import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {ExpandMore} from "@material-ui/icons";
import SelectedOptions from "../../components/SearchFilterMultipleSelect/components/SelectedOptions";

const useStyles = makeStyles((theme) => ({
    summary: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    bold: {
        fontWeight: 600,
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

function SearchFilterListItemDesktop({label, children, expanded, handleExpanded, id, expandId}) {
    const classes = useStyles();
    return (
        <Accordion elevation={0} square className={classes.accordion} expanded={expanded === expandId} onChange={handleExpanded(expandId)}>
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.summary}
            >
                <Typography className={classes.bold}>{label}</Typography>
                {
                    expandId !== 'vitals'
                    && <SelectedOptions filterId={id}/>
                }
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}

export default SearchFilterListItemDesktop;