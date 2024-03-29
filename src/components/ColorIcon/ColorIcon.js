import React from "react";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';

function ColorIcon({ebc, size, ...props}) {

    const ebuToColor = (ebc) => {
        if (ebc < 12)
            return '#e8c218';
        else if(ebc < 26)
            return '#de7c00';
        else if(ebc < 39)
            return '#ac5327';
        else if(ebc < 48)
            return '#612f2a';
        else if(ebc >= 48)
            return '#1c1211';
        else
            return '#bbb'
    }

    return (
        <LocalDrinkIcon style={{color: ebuToColor(ebc)}} fontSize={size} {...props} />
    );
}

export default ColorIcon;