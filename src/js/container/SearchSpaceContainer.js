import React from 'react';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import Navigation from "../components/Navigation";

class SearchSpaceContainer extends React.Component {
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
                    title={(
                        <TextField
                            inputStyle={{color: "#ffffff"}}
                            hintText="Search booth"/>
                    )}/>

                <Navigation
                    style={styles.navigation}
                    activeIndex={0}
                    onClick={(i) => this.handleClickNavigationButton(i)}/>
            </div>
        )
    }
}

export default SearchSpaceContainer;
