import React from "react";
import {Collapse} from "@material-ui/core";
import SelectedOptions
    from "../../../../../components/SearchFilter/components/SearchFilterMultipleSelect/components/SelectedOptions";
import {useRecoilValue} from "recoil";
import {recipeFilterIds} from "../../../../../state";

function CollapsableFilterView({showFilter}) {
    const recoilRecipeFilterIds = useRecoilValue(recipeFilterIds);

    return (
        <>
            {
                recoilRecipeFilterIds.length > 0
                &&
                <div>
                    <Collapse in={showFilter} timeout="auto" unmountOnExit>
                        <SelectedOptions />
                    </Collapse>

                </div>

            }
        </>
    );
}

export default CollapsableFilterView;