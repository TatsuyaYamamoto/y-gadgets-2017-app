import React from 'react';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

// TODO: replace icon
import SearchIcon from 'material-ui/svg-icons/action/search';
import MysteryIcon from 'material-ui/svg-icons/action/room';
import TweetIcon from 'material-ui/svg-icons/av/note';

import BoothComponent from '../components/BoothComponent';
import MysteryComponent from '../components/MysteryComponent';
import TweetsComponent from '../components/TweetsComponent';
import Navigation from "../components/Navigation";

class IndexContainer extends React.Component {
    state = {
        navigationIndex: 0
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

    getAppBar = (navigationIndex) => {
        let title;

        switch (navigationIndex) {
            case 0:
                title = (
                    <TextField
                        inputStyle={{color: "#ffffff"}}
                        hintText="Search booth"/>
                );
                break;
            case 1:
                title = "Mystery";
                break;
            case 2:
                title = "Twitter";
                break;
        }

        return (
            <AppBar
                showMenuIconButton={false}
                title={title}/>
        )
    };

    render() {
        const styles = this.getStyles();
        const appBar = this.getAppBar(this.state.navigationIndex);

        return (
            <div>
                {appBar}

                <Navigation
                    style={styles.navigation}
                    activeIndex={0}
                    onClick={(i) => {
                        console.log(i)
                    }}/>
            </div>
        )
    }
}

export default IndexContainer;
