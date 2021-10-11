import {inventoryKeyValueMap, recipeFilter} from "../../../../../state";
import {useRecoilState, useRecoilValue} from "recoil";
import {Chip} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getInventoryName} from "../../../../../utils/InventoryUtils";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    chip_container: {
        margin: theme.spacing(0.3)
    },
    chip: {
        maxWidth: '160px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginLeft: theme.spacing(0.4),
        marginTop: theme.spacing(0.3),
        marginBottom: theme.spacing(0.3),
    }
}));

function SelectedOptions({filterId}) {
    const classes = useStyles();
    const [options, setOptions] = useState([]); // {filterId, id}
    const [filterState, setRecoilFilterState] = useRecoilState(recipeFilter);
    const inventoryKeyValueMapState = useRecoilValue(inventoryKeyValueMap);

    const getNameFromId = (obj) => {
        return getInventoryName(obj.id, obj.filterId, inventoryKeyValueMapState);
    }
    const handleDelete = (obj) => {
        const arr = filterState[obj.filterId].slice();
        const index = arr.indexOf(obj.id);arr.splice(index, 1);
        if (index > -1) {
            setRecoilFilterState((originalFilterState) => ({
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
        ?
        <>
            <div className={classes.chip_container}>
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
                                color="success"
                                variant="outlined"
                            />
                        </span>
                    )
                }

            </div>
        </>
        :null
    );
}

export default SelectedOptions;