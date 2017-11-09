import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {List} from 'immutable';

import SearchAppBar from "../../components/SearchAppBar";
import SearchBoothList from "../../components/booth-list/SearchBoothList";

import {search, clearSearchCondition, selectCategory} from '../../modules/booth';

class SearchBoothContainer extends React.Component {
    handleClickBoothItem = (id) => {
        this.props.push(`/booths/${id}`);
    };

    handleChangeSearchText = (newValue) => {
        this.props.search(newValue);
    };

    handleClearSearchText = () => {
        this.props.clearSearchCondition();
    };

    handleSelectCategory = (name) => {
        this.props.selectCategory(name);
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
        const {booths, currentQuery, currentCategory} = this.props;
        const searchedBooths = !currentQuery ?
            List() :
            booths.filter((b) => {
                return [b.name, b.locationName, b.owner, b.description].join('').indexOf(currentQuery) !== -1;
            });

        return (
            <div>
                <SearchAppBar
                    categoryValue={currentCategory}
                    queryValue={currentQuery}
                    style={styles.appBar}
                    onClickBack={this.props.onRequestClose}
                    onChange={this.handleChangeSearchText}
                    onClickClear={this.handleClearSearchText}/>
                <div style={styles.content}>
                    <SearchBoothList
                        booths={searchedBooths}
                        onClick={this.handleClickBoothItem}
                        onSelectCategory={this.handleSelectCategory}/>
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
    const {query, category} = state.booth;

    return {
        booths,
        currentQuery: query,
        currentCategory: category,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        push: (path) => {
            dispatch(push(path))
        },
        search: (query) => {
            dispatch(search(query))
        },
        clearSearchCondition: () => {
            dispatch(clearSearchCondition())
        },
        selectCategory: (name) => {
            dispatch(selectCategory(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoothContainer);

