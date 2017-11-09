import React from 'react';
import {connect} from 'react-redux';

import Navigation from "../../components/Navigation";

import PinedBoothContainer from './PinedBoothContainer';
import SearchBoothContainer from './SearchBoothContainer';


import {loadBooths} from '../../modules/firebase';

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

    getStyles = () => {
        return {
            navigation: {
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 2
            },
        }
    };

    componentDidMount() {
        this.props.loadBooths();
    }

    render() {
        const styles = this.getStyles();
        const {isSearching} = this.state;

        const content = isSearching ?
            (<SearchBoothContainer
                onRequestClose={this.showGeneralList}/>) :
            (<PinedBoothContainer
                onClickSearchButton={this.showSearchList}/>);

        return (
            <div>
                {content}
                <Navigation
                    style={styles.navigation}
                    activeIndex={0}/>
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
        loadBooths: () => {
            dispatch(loadBooths())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSpaceContainer);

