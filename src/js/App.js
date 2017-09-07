import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IndexContainer from './container/index/IndexContainer';

const App = () => {
    return (
        <MuiThemeProvider>
            <IndexContainer/>
        </MuiThemeProvider>
    )
};

export default App;
