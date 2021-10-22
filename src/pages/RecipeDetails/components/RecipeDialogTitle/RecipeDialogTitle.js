import {Box, DialogTitle, IconButton, Typography, useTheme} from "@mui/material";
import {Close} from "@mui/icons-material";
import React from "react";
import ColorIcon from "../../../../components/ColorIcon/ColorIcon";

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

function RecipeDialogTitle({title, handleClose}) {
    const theme = useTheme();

    return (
        <BootstrapDialogTitle id="responsive-dialog-title" onClose={handleClose}>
            <Box sx={{display: 'flex'}}>
                <ColorIcon size="large" />
                <Typography
                    sx={{marginLeft: theme.spacing(2)}}
                    variant={'h5'}>
                    {title}
                </Typography>
            </Box>
        </BootstrapDialogTitle>
    )
};

export default RecipeDialogTitle;