import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';

import Navigation from "../components/Navigation";
import FxTimeLine from "../components/FxTimeLine";
import TimelineHelpDialog from '../components/helpDialog/TimelineHelpDialog';

class TweetContainer extends React.Component {
    state = {
        isHelpOpen: false,
    };

    handleClickHelpButton = () => {
        this.setState({isHelpOpen: true});
    };

    handleRequestCloseHelp = () => {
        this.setState({isHelpOpen: false});
    };

    handleClickSettingButton = () => {
        this.props.history.push('setting');
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
        const {isHelpOpen} = this.state;
        const styles = this.getStyles();

        const rightIcons = (
            <div>
                <IconButton onClick={this.handleClickHelpButton}><HelpIcon/></IconButton>
                <IconButton onClick={this.handleClickSettingButton}><SettingIcon/></IconButton>
            </div>
        );

        return (
            <div>
                <AppBar
                    title="Timeline"
                    showMenuIconButton={false}
                    iconElementRight={rightIcons}/>
                <FxTimeLine/>
                <Navigation
                    style={styles.navigation}
                    activeIndex={2}/>
                <TimelineHelpDialog
                    open={isHelpOpen}
                    onRequestClose={this.handleRequestCloseHelp}/>
            </div>
        )
    }
}

export default TweetContainer;
