import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {List} from 'immutable';

import SearchAppBar from "../../components/SearchAppBar";
import SearchBoothList from "../../components/booth-list/SearchBoothList";

class SearchBoothContainer extends React.Component {
    state = {
        searchText: ''
    };

    handleClickBoothItem = (id) => {
        this.props.push(`/booths/${id}`);
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
            content: {
                marginTop: 64,  // spacing.desktopKeylineIncrement
                marginBottom: 56, // getMuiTheme.bottomNavigation.height
            }
        }
    };

    render() {
        const styles = this.getStyles();
        const {searchText} = this.state;
        const {booths} = this.props;
        const searchedBooths = !searchText ?
            List() :
            booths.filter((b) => {
                return [b.name, b.locationName, b.owner, b.description].join('').indexOf(searchText) !== -1;
            });

        return (
            <div>
                <SearchAppBar
                    value={searchText}
                    style={styles.appBar}
                    onClickBack={this.props.onRequestClose}
                    onChange={this.handleChangeSearchText}
                    onClickClear={this.handleClearSearchText}/>
                <div style={styles.content}>
                    <SearchBoothList
                        booths={searchedBooths}
                        onClick={this.handleClickBoothItem}/>
                </div>
            </div>
        )
    }
}

SearchBoothContainer.propTypes = {
    onRequestClose: PropTypes.func,
};


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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoothContainer);

