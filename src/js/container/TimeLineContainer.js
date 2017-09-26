import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';

import Navigation from "../components/Navigation";
import FxTimeLine from "../components/FxTimeLine";

class TweetContainer extends React.Component {
    handleClickSettingButton = () =>{
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
            navigation: {
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }
        }
    };

    render() {
        const styles = this.getStyles();
        return (
            <div>
                <AppBar
                    title="Timeline"
                    showMenuIconButton={false}
                    iconElementRight={<IconButton><SettingIcon/></IconButton>}
                    onRightIconButtonTouchTap={this.handleClickSettingButton}/>
                <FxTimeLine/>
                <Navigation
                    style={styles.navigation}
                    activeIndex={2}
                    onClick={(i) => this.handleClickNavigationButton(i)}/>
            </div>
        )
    }
}

export default TweetContainer;
