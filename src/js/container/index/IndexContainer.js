import React from 'react';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

// TODO: replace icon
import SearchIcon from 'material-ui/svg-icons/action/search';
import MysteryIcon from 'material-ui/svg-icons/action/room';
import TweetIcon from 'material-ui/svg-icons/av/note';

import BoothComponent from './components/BoothComponent';
import MysteryComponent from './components/MysteryComponent';
import TweetsComponent from './components/TweetsComponent';

const TabLabels = {
    Booth: "Booth",
    Mystery: "Mystery",
    Tweets: "Tweets",
};

class IndexContainer extends React.Component {
    state = {
        tab: TabLabels.Mystery
    };


    _handleChangeTabs = (selectedTab) => {
        this.setState({tab: selectedTab});
    };

    render() {
        const {tab} = this.state;

        return (
            <div>
                <AppBar title={TabLabels[tab]}/>
                <Tabs
                    value={tab}
                    onChange={this._handleChangeTabs}>
                    <Tab icon={<SearchIcon/>} value={TabLabels.Booth}>
                        <BoothComponent/>
                    </Tab>
                    <Tab icon={<MysteryIcon/>} value={TabLabels.Mystery}>
                        <MysteryComponent/>
                    </Tab>
                    <Tab icon={<TweetIcon/>} value={TabLabels.Tweets}>
                        <TweetsComponent/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default IndexContainer;
