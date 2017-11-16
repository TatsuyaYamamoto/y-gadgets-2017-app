import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Navigation from "../components/Navigation";
import FxTimeLine from "../components/FxTimeLine";
import TimelineHelpDialog from '../components/helpDialog/TimelineHelpDialog';

import {APP_URL} from '../config';

class TweetContainer extends React.Component {
    state = {
        isHelpOpen: false,
    };
    handleClickTweetButton = () => {
        window.location.href = `https://twitter.com/intent/tweet?hashtags=横浜ガジェット祭り&url=${APP_URL}`;
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
            },
            tweetButton: {
                bottom: 56, // height of bottom navigation
                right: 0,
                margin: 20,
                position: 'fixed',
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

        const tweetButton = (
            <FloatingActionButton
                onClick={this.handleClickTweetButton}
                style={styles.tweetButton}>
                <ContentAdd/>
            </FloatingActionButton>
        );

        return (
            <div>
                <AppBar
                    title="Timeline"
                    showMenuIconButton={false}
                    iconElementRight={rightIcons}/>
                <FxTimeLine/>
                {tweetButton}
                <Navigation
                    style={styles.navigation}
                    activeIndex={1}/>
                <TimelineHelpDialog
                    open={isHelpOpen}
                    onRequestClose={this.handleRequestCloseHelp}/>
            </div>
        )
    }
}

export default TweetContainer;
