import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux'

import Routing from './Routing';
import {store} from './modules/redux';
import {login} from './modules/firebase';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// log-in firebase app.
store.dispatch(login());

const App = () => {
    return (
        <Provider store={store}>
            <MuiThemeProvider>
                <Routing/>
            </MuiThemeProvider>
        </Provider>
    )
};

/**
 * Error handling for failure to catch.
 *
 * @param messageOrEvent
 * @param source
 * @param lineno
 * @param colno
 * @param error
 */
window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    console.error(messageOrEvent, source, lineno, colno, error);
    if (window.confirm('エラーが発生したため、リロードします。')) {
        location.reload();
    }
};

export default App;
