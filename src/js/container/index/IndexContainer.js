import React from 'react';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

class IndexContainer extends React.Component {
    state = {
        tabIndex: 1
    };


    _handleChangeTabs = (selectedTabIndex) => {
        this.setState({tabIndex: selectedTabIndex});
    };

    render() {
        const {tabIndex} = this.state;

        return (
            <div>
                <AppBar title="Y Gadgets"/>
                <Tabs
                    value={tabIndex}
                    onChange={this._handleChangeTabs}>
                    <Tab label="Booth" value={0}/>
                    <Tab label="Mystery" value={1}/>
                    <Tab label="Tweets" value={2}/>
                </Tabs>
                <div>
                    App component.
                </div>
            </div>
        )
    }
}

export default IndexContainer;
