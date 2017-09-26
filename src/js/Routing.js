import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Index from './container/IndexContainer';
import Tweet from './container/TimeLineContainer';
import Search from './container/SearchSpaceContainer';
import Setting from './container/SettingContainer';

const Routing = () => (
    <Router>
        <Switch>
            <Route exact path="/mystery" component={Index}/>
            <Route exact path="/timeline" component={Tweet}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/setting" component={Setting}/>
            <Redirect from="*" to="/mystery"/>
        </Switch>
    </Router>
);

export default Routing;
