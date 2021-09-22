import {inventoryKeyValueMap, recipeFilterState} from "../../../../../state";
import {useRecoilState, useRecoilValue} from "recoil";
import {Chip} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {getInventoryName} from "../../../../../utils/InventoryUtils";
import {makeStyles} from "@material-ui/core/styles";

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
    const [recoilFilterState, setRecoilFilterState] = useRecoilState(recipeFilterState);
    const recoilInventoryKeyValueMap = useRecoilValue(inventoryKeyValueMap);

    const getNameFromId = (obj) => {
        return getInventoryName(obj.id, obj.filterId, recoilInventoryKeyValueMap);
    }
    const handleDelete = (obj) => {
        const arr = recoilFilterState[obj.filterId].slice();
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
            setOptions(recoilFilterState[filterId].map(e => ({filterId, id: e})));
        } else {
            setOptions(Object.entries(recoilFilterState).reduce((acc, current) => {
                const filterId = current[0];
                const idArray = current[1];
                idArray.forEach(e => acc.push({filterId, id: e}));
                return acc;
            }, []));
        }
    }, [recoilFilterState, filterId])

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