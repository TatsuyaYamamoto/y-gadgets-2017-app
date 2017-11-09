import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import SearchIcon from 'material-ui/svg-icons/action/search';

import BoothList from "../../components/booth-list/BoothList";
import SearchHelpDialog from '../../components/helpDialog/SearchHelpDialog';

class PinedBoothContainer extends React.Component {
    state = {
        isHelpOpen: false,
    };

    showSearchList = () => {
        this.props.onClickSearchButton();
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

    render() {
        const {isHelpOpen} = this.state;
        const {booths, pinedBooths} = this.props;
        const randomBooths = booths.sortBy(Math.random).slice(0, 5);
        const rightIcons = (
            <div>
                <IconButton onClick={this.handleClickHelpButton}><HelpIcon/></IconButton>
                <IconButton onClick={this.showSearchList}><SearchIcon/></IconButton>
            </div>
        );

        return (
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

                <SearchHelpDialog
                    open={isHelpOpen}
                    onRequestClose={this.handleRequestCloseHelp}/>
            </div>
        )
    }
}

PinedBoothContainer.propTypes = {
    onClickSearchButton: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(PinedBoothContainer);

