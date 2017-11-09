import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import {syncHistory} from './modules/redux';

import Index from './container/IndexContainer';
import Tweet from './container/TimeLineContainer';
import Booth from './container/BoothListContainer';
import BoothDetail from './container/BoothDetailContainer';
import Setting from './container/SettingContainer';

const Routing = () => (
    <Router history={syncHistory}>
        <Switch>
            <Route exact path="/mystery" component={Index}/>
            <Route exact path="/timeline" component={Tweet}/>
            <Route exact path="/booths" component={Booth}/>
            <Route exact path="/booths/:id" component={BoothDetail}/>
            <Route exact path="/setting" component={Setting}/>
            <Redirect from="*" to="/mystery"/>
        </Switch>
    </Router>
);

export default Routing;
