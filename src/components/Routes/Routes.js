import React from "react";
import {Route} from 'wouter';
import Search from "../../pages/Search/Search";
import RecipeDetails, {routePattern as recipeDetailsLinkPattern} from "../../pages/RecipeDetails/RecipeDetails";

function Routes (props) {
    return (
        <>
            <Search handleDrawerToggle={props.handleDrawerToggle}/>
            <Route path={recipeDetailsLinkPattern}><RecipeDetails /></Route>
        </>
    );
};

export default Routes;