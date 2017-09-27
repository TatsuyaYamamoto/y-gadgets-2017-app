import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';

import Navigation from "../components/Navigation";
import MysteryComponent from "../components/MysteryComponent";
import {loadQuestions} from "../modules/firebase";

class IndexContainer extends React.Component {
    handleClickSettingButton = () => {
        this.props.history.push('setting');
    };

    getStyles = () => {
        return {
            appBar: {
                position: 'fixed',
                top: 0,
            },
            navigation: {
                position: 'fixed',
                bottom: 0,
                width: '100%'
            },
            content: {
                marginTop: 64,  // spacing.desktopKeylineIncrement
                marginBottom: 56, // getMuiTheme.bottomNavigation.height
            }
        }
    };

    componentDidMount() {
        this.props.loadQuestions();
    }

    render() {
        const styles = this.getStyles();

        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    iconElementRight={<IconButton><SettingIcon/></IconButton>}
                    onRightIconButtonTouchTap={this.handleClickSettingButton}
                    title="Mystery"
                    style={styles.appBar}/>

                <div style={styles.content}>
                    <MysteryComponent/>
                </div>

                <Navigation
                    style={styles.navigation}
                    activeIndex={1}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadQuestions: () => {
            dispatch(loadQuestions())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
