import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';

import Navigation from "../components/Navigation";
import MysteryComponent from "../components/MysteryComponent";

class IndexContainer extends React.Component {
    handleClickSettingButton = () => {
        this.props.history.push('setting');
    };

    handleClickNavigationButton = (index) => {
        switch (index) {
            case 0:
                this.props.history.push("/search");
                break;
            case 1:
                this.props.history.push("/");
                break;
            case 2:
                this.props.history.push("timeline");
                break;
            default:
                break;
        }
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
                    activeIndex={1}
                    onClick={(i) => this.handleClickNavigationButton(i)}/>
            </div>
        )
    }
}

export default IndexContainer;
