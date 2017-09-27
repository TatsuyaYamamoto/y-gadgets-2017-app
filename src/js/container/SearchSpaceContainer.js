import React from 'react';

import Navigation from "../components/Navigation";
import SearchAppBar from "../components/SearchAppBar";

class SearchSpaceContainer extends React.Component {
    state = {
        searchText: ''
    };

    handleChangeSearchText = (event, newValue) => {
        this.setState({searchText: newValue});
    };

    getStyles = () => {
        return {
            navigation: {
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }
        }
    };

    render() {
        const styles = this.getStyles();
        const {searchText} = this.state;

        return (
            <div>
                <SearchAppBar
                    value={searchText}
                    onChange={this.handleChangeSearchText}/>

                <Navigation
                    style={styles.navigation}
                    activeIndex={0}/>
            </div>
        )
    }
}

export default SearchSpaceContainer;
