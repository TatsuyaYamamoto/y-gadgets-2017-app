import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ListIcon from 'material-ui/svg-icons/action/list';

import Navigation from "../components/Navigation";
import SearchAppBar from "../components/SearchAppBar";
import BoothList from "../components/BoothList";
import SearchHelpDialog from '../components/helpDialog/SearchHelpDialog';

import {loadBooths} from '../modules/firebase';

class SearchSpaceContainer extends React.Component {
    state = {
        isHelpOpen: false,
        isSearching: false,
        searchText: ''
    };

    showSearchList = () => {
        this.setState({isSearching: true})
    };

    showGeneralList = () => {
        this.setState({isSearching: false})
    };

    handleClickBoothItem = (id) => {
        this.props.push(`/booths/${id}`);
    };

    handleClickHelpButton = () => {
        this.setState({isHelpOpen: true});
    };

    handleRequestCloseHelp = () => {
        this.setState({isHelpOpen: false});
    };

    handleChangeSearchText = (event, newValue) => {
        this.setState({searchText: newValue});
    };

    handleClearSearchText = (event, newValue) => {
        this.setState({searchText: ''});
    };

    getStyles = () => {
        return {
            appBar: {
                position: 'fixed',
                top: 0,
                zIndex: 2
            },
            navigation: {
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 2
            },
            content: {
                marginTop: 64,  // spacing.desktopKeylineIncrement
                marginBottom: 56, // getMuiTheme.bottomNavigation.height
            }
        }
    };

    componentDidMount() {
        this.props.loadBooths();
    }

    render() {
        const styles = this.getStyles();
        const {searchText, isSearching, isHelpOpen} = this.state;
        const {booths, pinedBooths} = this.props;
        const randomBooths = booths.sortBy(Math.random).slice(0, 5);
        const searchedBooths = booths.filter((b) => {
            return [b.name, b.locationName, b.owner, b.description].join('').indexOf(searchText) !== -1;
        });

        const rightIcons = (
            <div>
                <IconButton onClick={this.handleClickHelpButton}><HelpIcon/></IconButton>
                <IconButton onClick={this.showSearchList}><SearchIcon/></IconButton>
            </div>
        );

        const content =
            isSearching ? (
                    <div>
                        <SearchAppBar
                            value={searchText}
                            style={styles.appBar}
                            onClickBack={this.showGeneralList}
                            onChange={this.handleChangeSearchText}
                            onClickClear={this.handleClearSearchText}/>
                        <div style={styles.content}>
                            <BoothList
                                booths={searchedBooths}
                                onClick={this.handleClickBoothItem}/>
                        </div>
                    </div>
                ) :
                (
                    <div>
                        <AppBar
                            showMenuIconButton={false}
                            iconElementRight={rightIcons}/>
                        <BoothList
                            subheader="Pined booths"
                            booths={pinedBooths}
                            onClick={this.handleClickBoothItem}/>
                        <Divider/>
                        <BoothList
                            subheader="Random recommend booths"
                            booths={randomBooths}
                            onClick={this.handleClickBoothItem}/>
                    </div>
                );

        return (
            <div>
                {content}
                <Navigation
                    style={styles.navigation}
                    activeIndex={0}/>
                <SearchHelpDialog
                    open={isHelpOpen}
                    onRequestClose={this.handleRequestCloseHelp}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const booths = state.firebase.booths;
    const pinedIds = state.firebase.get('pins');
    const pinedBooths = booths.filter((b, key) => pinedIds.has(key));

    return {
        booths,
        pinedBooths
    }
}

function mapDispatchToProps(dispatch) {
    return {
        push: (path) => {
            dispatch(push(path))
        },
        loadBooths: () => {
            dispatch(loadBooths())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSpaceContainer);

