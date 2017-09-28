import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Navigation from "../components/Navigation";
import SearchAppBar from "../components/SearchAppBar";

import {loadBooths} from '../modules/firebase';
import BoothList from "../components/BoothList";

class SearchSpaceContainer extends React.Component {
    state = {
        searchText: ''
    };

    handleClickBoothItem = (id) => {
        this.props.push(`/booths/${id}`);
    };

    handleChangeSearchText = (event, newValue) => {
        this.setState({searchText: newValue});
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
        const {searchText} = this.state;
        const {booths} = this.props;

        return (
            <div>
                <SearchAppBar
                    value={searchText}
                    style={styles.appBar}
                    onChange={this.handleChangeSearchText}/>

                <div style={styles.content}>
                    <BoothList
                        booths={booths}
                        onClick={this.handleClickBoothItem}/>
                </div>

                <Navigation
                    style={styles.navigation}
                    activeIndex={0}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        booths: state.firebase.booths
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

