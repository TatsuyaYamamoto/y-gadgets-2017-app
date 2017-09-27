import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory'

// Singleton that app can use.
// developer MUST use methods provided by react-router-redux.
const history = createHistory();

export const reducer = combineReducers({
    routing: routerReducer,
});

export const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history)),
    )
);

// enhanced history for react-router-redux.
export const syncHistory = syncHistoryWithStore(history, store);
