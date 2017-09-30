import * as firebase from 'firebase';

import {firebase as firebaseConfig} from '../config';

let app = firebase.initializeApp(firebaseConfig);

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export const Actions = {
    LOGIN_REQUEST: 'y-gadgets/firebase/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'y-gadgets/firebase/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'y-gadgets/firebase/LOGIN_FAILURE',
    LOAD_QUESTIONS_REQUEST: 'y-gadgets/firebase/LOAD_QUESTIONS_REQUEST',
    LOAD_QUESTIONS_SUCCESS: 'y-gadgets/firebase/LOAD_QUESTIONS_SUCCESS',
    LOAD_QUESTIONS_FAILURE: 'y-gadgets/firebase/LOAD_QUESTIONS_FAILURE',
    LOAD_BOOTHS_REQUEST: 'y-gadgets/firebase/LOAD_BOOTHS_REQUEST',
    LOAD_BOOTHS_SUCCESS: 'y-gadgets/firebase/LOAD_BOOTHS_SUCCESS',
    LOAD_BOOTHS_FAILURE: 'y-gadgets/firebase/LOAD_BOOTHS_FAILURE',
};

// ---------------------------------------------------------------------------
// Action creators
// ---------------------------------------------------------------------------
export function login() {
    return function (dispatch) {
        dispatch(loginRequest());
        return app.auth().signInAnonymously()
            .then(function (user) {
                dispatch(loginSuccess(user));
            })
            .catch(function (error) {
                dispatch(loginFailure(error));
            });
    }
}

/**
 * Create action to login request.
 * @returns {{type: string}}
 */
function loginRequest() {
    return {type: Actions.LOGIN_REQUEST}
}


/**
 * Create action to login success.
 *
 * @param firebaseUser {@see https://firebase.google.com/docs/reference/js/firebase.User}
 * @returns {{type: string}}
 */
function loginSuccess(firebaseUser) {
    return {
        type: Actions.LOGIN_SUCCESS,
        payload: {
            login: firebaseUser
        }
    }
}

function loginFailure(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    if (errorCode === 'auth/operation-not-allowed') {
        alert('Not allowed to logged-in as Anonymous user.');
    } else {
        console.error(error);
    }

    return {
        type: Actions.LOGIN_FAILURE,
        payload: error,
        error: true,
    }
}

/**
 *
 *
 * @returns {Function}
 */
export function loadQuestions() {
    return function (dispatch, getState) {
        dispatch({type: Actions.LOAD_QUESTIONS_REQUEST});

        return app.database().ref('questions').once('value')
            .then((snapshot) => {
                dispatch(loadQuestionsSuccess(snapshot.val()));
            })
            .catch((error) => {
                dispatch({type: Actions.LOAD_QUESTIONS_FAILURE});
            });
    }
}

function loadQuestionsSuccess(snapshot) {
    return {
        type: Actions.LOAD_QUESTIONS_SUCCESS,
        payload: {
            snapshot
        }
    }
}

// TODO: can use query of booth id.
export function loadBooths() {
    return function (dispatch) {
        dispatch({type: Actions.LOAD_BOOTHS_REQUEST});

        return app.database().ref('booths').once('value')
            .then((snapshot) => {
                dispatch(loadBoothsSuccess(snapshot.val()));
            })
            .catch((error) => {
                dispatch({type: Actions.LOAD_BOOTHS_FAILURE});
            });
    }
}

function loadBoothsSuccess(snapshot) {
    return {
        type: Actions.LOAD_BOOTHS_SUCCESS,
        payload: {
            snapshot
        }
    }
}

export function postLike(boothId) {
    // check that the user logged-in.
    app.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const db = app.database();
            const newLikeKey = db.ref('likes').ref.push().key;
            db.ref(`likes/${newLikeKey}`).set({
                uid: user.uid,
                booth_id: boothId,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });

        } else {
            // No user is signed in.
        }
    });
}

function getCurrentUser() {
    return new Promise(function (onFulfilled, onRejected) {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                onFulfilled(user);
            } else {
                // No user is signed in.
                onRejected();
            }
        });
    });
}

// ---------------------------------------------------------------------------
// reducer
// ---------------------------------------------------------------------------
const initialState = {
    login: null,
    questions: {},
    booths: {}
};

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch (action.type) {
        case Actions.LOGIN_REQUEST:
            return state;

        case Actions.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                login: payload.login
            });

        case Actions.LOGIN_FAILURE:
            return state;

        case Actions.LOAD_QUESTIONS_REQUEST:
            return state;

        case Actions.LOAD_QUESTIONS_SUCCESS:
            return Object.assign({}, state, {
                questions: payload.snapshot
            });

        case Actions.LOAD_QUESTIONS_FAILURE:
            return state;

        case Actions.LOAD_BOOTHS_REQUEST:
            return state;

        case Actions.LOAD_BOOTHS_SUCCESS:
            return Object.assign({}, state, {
                booths: payload.snapshot
            });

        case Actions.LOAD_BOOTHS_FAILURE:
            return state;

        default:
            return state;
    }
}