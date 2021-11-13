import {EMPTY_STATE as FILTER_EMPTY_STATE, inventoryKeyValueMap, recipeFilter} from "../../../../../state";
import {useRecoilState, useRecoilValue} from "recoil";
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
    const [options, setOptions] = useState([]);
    const [filterState, setRecipeFilterState] = useRecoilState(recipeFilter);
    const inventoryKeyValueMapState = useRecoilValue(inventoryKeyValueMap);
    const clearFilter = () => { setRecipeFilterState(FILTER_EMPTY_STATE);}

    const handleDelete = ({filterId, id}) => {
        if (['og','fg','abv','size','ibu'].includes(filterId)) {
            setRecipeFilterState((originalFilterState) => ({
                ...originalFilterState,
                [filterId]: []
            }))
        } else {
            const arr = filterState[filterId].slice();
            const index = arr.indexOf(id);arr.splice(index, 1);
            if (index > -1) {
                setRecipeFilterState((originalFilterState) => ({
                    ...originalFilterState,
                    [filterId]: arr
                }))
            }
        }
    }
    useEffect(() => {
        function getNameFromId (filterId, id) {
            return getInventoryName(id, filterId, inventoryKeyValueMapState);
        }

        if (filterId) {
            setOptions(filterState[filterId].map(e => ({filterId, id: e, desc: getNameFromId(filterId, e)})));
        } else {
            setOptions(Object.entries(filterState).reduce((acc, current) => {
                const filterId = current[0];
                const idArray = current[1];
                if (['og','fg','abv','size','ibu'].includes(filterId)) {
                    if (idArray.length > 0) {
                        acc.push({desc: `${filterId.toUpperCase()} ${idArray[0]} till ${idArray[1]}`, filterId});
                    }
                } else {
                    idArray.forEach(id => acc.push({desc: getNameFromId(filterId, id), id, filterId}));
                }
                return acc;
            }, []));
        }
    }, [filterState, filterId, inventoryKeyValueMapState])

    return (
        options.length > 0
        ? <Box className={classes.chip_container}>
                <Box className={classes.chip_container_options}>
                {
                    options.map(c =>
                        <span key={c.id}>
                            <Chip
                                className={classes.chip}
                                label={c.desc}
                                title={c.desc}
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