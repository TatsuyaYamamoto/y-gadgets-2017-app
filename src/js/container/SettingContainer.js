import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import {List, ListItem} from 'material-ui/List';
import SubHeader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import packageJson from '../../../package.json';
import OpenSourceLicenseList from "../components/OpenSourceLicenseList";

const OpenSourceLicenseDialog = (props) => {
    const {
        open,
        onRequestClose,
        licenses
    } = props;

    return (
        <Dialog
            autoScrollBodyContent
            open={open}
            actions={[
                <FlatButton
                    label="OK"
                    onClick={onRequestClose}
                />,
            ]}
            onRequestClose={onRequestClose}>
            <OpenSourceLicenseList licenses={licenses}/>
        </Dialog>
    )
};

class SettingContainer extends React.Component {
    state = {
        isLicensesDialogOpen: false
    };

    handleClickBack = () => {
        this.props.goBack();
    };

    handleDialog = (open = false) => {
        this.setState({isLicensesDialogOpen: open});
    };

    render() {
        const {user} = this.props;
        const {isLicensesDialogOpen} = this.state;
        const userId = user ? user.uid : 'Not logged in';
        const licenses = Object.keys(packageJson.dependencies).map(key => {
            return {
                name: key,
                version: packageJson.dependencies[key]
            }
        });

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
                    <ListItem
                        primaryText="Open source licenses"
                        onClick={() => this.handleDialog(true)}/>
                    <ListItem
                        primaryText="Application version"
                        secondaryText={packageJson.version}/>
                </List>

                <OpenSourceLicenseDialog
                    licenses={licenses}
                    open={isLicensesDialogOpen}
                    onRequestClose={() => this.handleDialog(false)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
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
