import React, {useEffect, useState} from "react";
import makeStyles from '@mui/styles/makeStyles';
import SearchBar from "./components/SearchBar/SearchBar";
import Recipes from "./components/RecipesListing/Recipes";
import {Container, Divider, IconButton, useMediaQuery} from "@mui/material";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {demo, filterVisible, freeTextSearchState,} from "../../state";
import SearchFilterDesktop from "../../components/SearchFilter/SearchFilterDesktop/SearchFilterDesktop";
import ActionBar from './components/ActionBar/ActionBar';


const filterWidth = '20rem';
const DEFAULT_SHOW_TABLE = false;
const DEFAULT_SHOW_FIXED = false;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    searchContainer: {
        display: "flex",
        flexGrow: 0,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    fixedContainer: {
        backgroundColor: 'yellow',
    },
    actionContainer: {
        position: '',
        display: 'flex',
        alignItems: 'flex-end',
        flexGrow: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        flex: '1 0 auto',
        padding: 0,
    },
    contentContainerFilter: {
        paddingRight: '1rem',
        position: 'relative',
        flex: `0 0 ${filterWidth}`,
    },
    contentContainerResult: {
        display: 'flex',
        flex: "1 1 auto",
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function Search(props) {
    const classes = useStyles();
    const setFreeTextSearchState = useSetRecoilState(freeTextSearchState);

    const [showTable, setShowTable] = useState(DEFAULT_SHOW_TABLE);
    const [showFixed, setShowFixed] = useState(DEFAULT_SHOW_FIXED);

    const filterVisibleState = useRecoilValue(filterVisible);
    const demoState = useRecoilValue(demo);

    useEffect(() => {
        function handleScrollEvent () {
            if (window.scrollY >= 132 && !showFixed) {
                setShowFixed(true);
            } else {
                setShowFixed(false);
            }
        };

        window.addEventListener('scroll', handleScrollEvent, {passive: true});
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, [showFixed]);


    const onChange = (value) => {
        setFreeTextSearchState(value);
    }
    const onClear = () => {
        setFreeTextSearchState('');
    }

    const smUP = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const mdUP = useMediaQuery(theme => theme.breakpoints.up('md'));

    return (
        <main className={classes.root} displayname={'Search'}>
            {/*<FixedBar showFixed={showFixed} />*/}
            <Container maxWidth={'xs'} className={classes.searchContainer}>
                <SearchBar
                    handleDrawerToggle={props.handleDrawerToggle}
                    onChange={onChange}
                    onClear={onClear} />
            </Container>
            <Container maxWidth={'lg'} className={classes.actionContainer}>
                <ActionBar setShowTable={setShowTable} showTable={showTable} />
            </Container>
            {
                smUP
                && <Divider />
            }
            <Container maxWidth={'lg'} className={classes.contentContainer}>
                {
                    mdUP
                    && filterVisibleState
                    && <div className={classes.contentContainerFilter}>
                            <SearchFilterDesktop />
                    </div>
                }
                <div className={classes.contentContainerResult}>
                    <Recipes showTable={showTable} filterVisible={filterVisibleState}/>
                </div>
            </Container>
        </main>
    );
}

export default Search;