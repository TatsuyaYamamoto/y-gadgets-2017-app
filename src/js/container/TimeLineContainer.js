import React from 'react';

import AppBar from 'material-ui/AppBar';

import Navigation from "../components/Navigation";
import TweetsComponent from "../components/TweetsComponent";

class TweetContainer extends React.Component {
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
                    showMenuIconButton={false}
                    title="Timeline"/>
                <TweetsComponent/>
                <Navigation
                    style={styles.navigation}
                    activeIndex={2}
                    onClick={(i) => this.handleClickNavigationButton(i)}/>
            </div>
        )
    }
}

export default TweetContainer;
