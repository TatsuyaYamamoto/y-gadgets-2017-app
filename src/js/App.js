import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux'

import Routing from './Routing';
import {store} from './modules/redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
                <Routing/>
            </MuiThemeProvider>
        </Provider>
    )
};

export default App;
