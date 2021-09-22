import React from 'react';
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchFilterListItem from "./components/SearchFilterListItem/SearchFilterListItem";
import SearchFilterSlider from "./components/SearchFilterSlider/SearchFilterSlider";
import SearchFilterMultipleSelect from "./components/SearchFilterMultipleSelect/SearchFilterMultipleSelect";
import ResponsiveFooter from "./components/ResponsiveFooter/ResponsiveFooter";
import {useRecoilState} from "recoil";
import {recipeFilterState} from "../../state";
import {abvFormat, defaultFormat, gravityFormat} from "./utils/FormatUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    content: {
        flexGrow: 1
    }
}));

function SearchFilter({handleDrawerToggle}) {
    const classes = useStyles();
    const [recoilFilterState, setRecoilFilterState] = useRecoilState(recipeFilterState);

    const onUpdate = (id, value) => {
        setRecoilFilterState((originalFilterState) => ({
            ...originalFilterState,
            [id]: value
        }))
    };

    return (
        <div className={classes.root} displayname={'SearchFilter'}>

            <div className={classes.content}>
                <SearchFilterListItem
                    listKey={'vitals'}
                    id={['og', 'fg', 'ibu', 'abv', 'size']}
                    label={'Vitalparametrar'}
                    handleDrawerToggle={handleDrawerToggle}>
                    <Container style={{marginTop: '1rem'}}>
                        <SearchFilterSlider
                            id={'og'}
                            label={'OG'}
                            max={200}
                            valueText={gravityFormat}
                            onUpdate={onUpdate}
                            value={[...recoilFilterState.og]}
                        />
                        <SearchFilterSlider
                            id={'abv'}
                            label={'ABV'}
                            max={15}
                            step={0.5}
                            valueText={abvFormat}
                            onUpdate={onUpdate}
                            value={recoilFilterState.abv.slice()}
                        />
                        <SearchFilterSlider
                            id={'size'}
                            label={'Storlek'}
                            max={50}
                            valueText={defaultFormat}
                            onUpdate={onUpdate}
                            value={recoilFilterState.size.slice()}
                        />
                        <SearchFilterSlider
                            id={'fg'}
                            label={'FG'}
                            max={50}
                            valueText={gravityFormat}
                            onUpdate={onUpdate}
                            value={recoilFilterState.fg.slice()}
                        />
                        <SearchFilterSlider
                            id={'ibu'}
                            label={'IBU'}
                            max={80}
                            valueText={defaultFormat}
                            onUpdate={onUpdate}
                            value={recoilFilterState.ibu.slice()}
                        />
                    </Container>
                </SearchFilterListItem>

                <SearchFilterListItem id={'fermentables'} label={'Jäsbara'} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'fermentables'} label={'Jäsbara'} values={recoilFilterState.fermentables} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem id={'hops'} label={'Humle'} filter={recoilFilterState.hops} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'hops'} label={'Humle'} values={recoilFilterState.hops} onUpdate={onUpdate} />
                </SearchFilterListItem>
                <SearchFilterListItem id={'yeasts'} label={'Jäst'} filter={recoilFilterState.yeasts} handleDrawerToggle={handleDrawerToggle}>
                    <SearchFilterMultipleSelect id={'yeasts'} label={'Jäst'} values={recoilFilterState.yeasts} onUpdate={onUpdate} />
                </SearchFilterListItem>
            </div>

            <ResponsiveFooter handleDrawerToggle={handleDrawerToggle}/>
        </div>
    );
}

export default SearchFilter;