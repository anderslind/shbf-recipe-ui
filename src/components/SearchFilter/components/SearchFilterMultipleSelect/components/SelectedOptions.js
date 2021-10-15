import {
    EMPTY_STATE as FILTER_EMPTY_STATE,
    inventoryKeyValueMap,
    recipeFilter,
    recipeFilterIds
} from "../../../../../state";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {Box, Chip, IconButton, Tooltip} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getInventoryName} from "../../../../../utils/InventoryUtils";
import makeStyles from '@mui/styles/makeStyles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const useStyles = makeStyles((theme) => ({
    chip_container: {
        display: 'flex',
        alignItems: 'baseline',
        margin: theme.spacing(0.3)
    },
    chip_container_options: {
        flexGrow: 1,
    },
    chip_container_actions: {
        flexShrink: 1,
    },
    chip: {
        maxWidth: '160px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function SelectedOptions({filterId}) {
    const classes = useStyles();
    const [options, setOptions] = useState([]); // {filterId, id}
    const [filterState, setRecipeFilterState] = useRecoilState(recipeFilter);
    const inventoryKeyValueMapState = useRecoilValue(inventoryKeyValueMap);
    const recipeFilterIdsState = useRecoilValue(recipeFilterIds);
    const clearFilter = () => { setRecipeFilterState(FILTER_EMPTY_STATE);}

    const getNameFromId = (obj) => {
        return getInventoryName(obj.id, obj.filterId, inventoryKeyValueMapState);
    }
    const handleDelete = (obj) => {
        const arr = filterState[obj.filterId].slice();
        const index = arr.indexOf(obj.id);arr.splice(index, 1);
        if (index > -1) {
            setRecipeFilterState((originalFilterState) => ({
                ...originalFilterState,
                [obj.filterId]: arr
            }))
        }
    }
    useEffect(() => {
        if (filterId) {
            setOptions(filterState[filterId].map(e => ({filterId, id: e})));
        } else {
            setOptions(Object.entries(filterState).reduce((acc, current) => {
                const filterId = current[0];
                const idArray = current[1];
                idArray.forEach(e => acc.push({filterId, id: e}));
                return acc;
            }, []));
        }
    }, [filterState, filterId])

    return (
        options.length > 0
        ? <Box className={classes.chip_container}>
                <Box className={classes.chip_container_options}>
                {
                    options.map(c =>
                        <span key={c.id}>
                            <Chip
                                className={classes.chip}
                                label={getNameFromId(c)}
                                title={getNameFromId(c)}
                                onDelete={() => handleDelete(c)}
                                value={+c.id}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                        </span>
                    )
                }
                </Box>
                {
                    filterId
                    ? null
                    : <Box className={classes.chip_container_actions}>
                        <IconButton onClick={() => clearFilter()} size="large" title={'Rensa filter'}>
                            <Tooltip title={'Rensa filter'}>
                                <HighlightOffIcon />
                            </Tooltip>
                        </IconButton>
                    </Box>
                }
            </Box>
        :null
    );
}

export default SelectedOptions;