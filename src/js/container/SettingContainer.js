import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import {List, ListItem} from 'material-ui/List';
import SubHeader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import packageJson from '../../../package.json';

class SettingContainer extends React.Component {
    handleClickBack = () => {
        this.props.goBack();
    };

    render() {
        const {user} = this.props;
        const userId = user ? user.uid : 'Not logged in';

        return (
            <div>
                <AppBar
                    iconElementLeft={<IconButton><ArrowBackIcon/></IconButton>}
                    onLeftIconButtonTouchTap={this.handleClickBack}
                    title="Setting"/>

                <List>
                    <SubHeader>General</SubHeader>
                    <ListItem primaryText="Language"/>
                    <ListItem
                        primaryText="User ID"
                        secondaryText={userId}
                    />
                </List>
                <Divider/>
                <List>
                    <SubHeader>About</SubHeader>
                    <ListItem primaryText="Open source licenses"/>
                    <ListItem
                        primaryText="Application version"
                        secondaryText={packageJson.version}/>
                </List>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        user: state.firebase.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goBack: () => {
            dispatch(goBack())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
