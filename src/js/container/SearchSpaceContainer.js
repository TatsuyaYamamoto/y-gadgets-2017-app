import React from 'react';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import Navigation from "../components/Navigation";

class SearchSpaceContainer extends React.Component {

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
                    activeIndex={0}/>
            </div>
        )
    }
}

export default SearchSpaceContainer;
