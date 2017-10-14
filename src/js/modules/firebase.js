import * as firebase from 'firebase';
import {Record, Map} from 'immutable';

import Question from "./entity/Question";
import FirebaseUser from "./entity/FirebaseUser";
import Booth from "./entity/Booth";

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
    POST_BOOTH_LIKE_REQUEST: 'y-gadgets/firebase/POST_BOOTH_LIKE_REQUEST',
    POST_BOOTH_LIKE_SUCCESS: 'y-gadgets/firebase/POST_BOOTH_LIKE_SUCCESS',
    POST_BOOTH_LIKE_FAILURE: 'y-gadgets/firebase/POST_BOOTH_LIKE_FAILURE',
    POST_BOOTH_PIN_REQUEST: 'y-gadgets/firebase/POST_BOOTH_PIN_REQUEST',
    POST_BOOTH_PIN_SUCCESS: 'y-gadgets/firebase/POST_BOOTH_PIN_SUCCESS',
    POST_BOOTH_PIN_FAILURE: 'y-gadgets/firebase/POST_BOOTH_PIN_FAILURE',
    UPDATE_BOOTH: 'y-gadgets/firebase/UPDATE_BOOTH',
    UPDATE_OWN_PINS: 'y-gadgets/firebase/UPDATE_OWN_PINS',
    UPDATE_OWN_LIKES: 'y-gadgets/firebase/UPDATE_OWN_LIKES',
};

// ---------------------------------------------------------------------------
// Action creators
// ---------------------------------------------------------------------------
export function login() {
    return function (dispatch) {
        dispatch(loginRequest());
        return app.auth().signInAnonymously()
            .then(function (user) {
                console.log('Success to log-in to firebase system! user:', user);
                dispatch(loginSuccess(user));

                // init event
                app.database().ref('booths').on('child_changed', function (snapshot) {
                    dispatch(updateBooth(snapshot));
                });
                app.database().ref(`users/${user.uid}/likes`).on('value', function (snapshot) {
                    console.log("update likes!", snapshot.key, snapshot.val());
                    dispatch(updateOwnLikes(snapshot));
                });
                app.database().ref(`users/${user.uid}/pins`).on('value', function (snapshot) {
                    console.log("update pins!", snapshot);
                    dispatch(updateOwnPins(snapshot));
                });
            })
            .catch(function (error) {
                console.error('Fail to log-in.', error);
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
                console.log('Success to load questions! snapshot:', snapshot);
                dispatch(loadQuestionsSuccess(snapshot));
            })
            .catch((error) => {
                console.error('Fail to load questions.', error);
                dispatch({type: Actions.LOAD_QUESTIONS_FAILURE});
            });
    }
}

function loadQuestionsSuccess(snapshot) {
    return {
        type: Actions.LOAD_QUESTIONS_SUCCESS,
        payload: {
            questionsValue: snapshot.val()
        }
    }
}

// TODO: can use query of booth id.
export function loadBooths() {
    return function (dispatch) {
        dispatch({type: Actions.LOAD_BOOTHS_REQUEST});

        return app.database().ref('booths').once('value')
            .then((snapshot) => {
                console.log('Success to load booths! snapshot:', snapshot);
                dispatch(loadBoothsSuccess(snapshot));
            })
            .catch((error) => {
                console.error('Fail to load booths.', error);
                dispatch({type: Actions.LOAD_BOOTHS_FAILURE});
            });
    }
}

function loadBoothsSuccess(snapshot) {
    return {
        type: Actions.LOAD_BOOTHS_SUCCESS,
        payload: {
            boothsValue: snapshot.val()
        }
    }
}

/**
 *
 * @param boothId
 */
export function postBoothLike(boothId) {
    return function (dispatch) {
        dispatch(postBoothLikeRequest());

        return getCurrentUser()
            .then((user) => {
                const newLikeKey = app.database().ref('likes').push().key;
                const updates = {};
                updates[`/booths/${boothId}/likes/${user.uid}`] = true;
                updates[`/likes/${newLikeKey}`] = {
                    uid: user.uid,
                    booth_id: boothId,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                };
                updates[`/users/${user.uid}/likes/${boothId}`] = true;

                return app.database().ref().update(updates);
            })
            .then(() => {
                console.log("Success to post like booth. ID: " + boothId);
                dispatch(postBoothLikeSuccess());
            })
            .catch((e) => {
                console.error(e);
                dispatch(postBoothLikeFailure());
            });
    }
}

function postBoothLikeRequest() {
    return {type: Actions.POST_BOOTH_LIKE_REQUEST}
}


function postBoothLikeSuccess(firebaseUser) {
    return {
        type: Actions.POST_BOOTH_LIKE_SUCCESS,
    }
}

function postBoothLikeFailure(error) {
    return {
        type: Actions.POST_BOOTH_LIKE_FAILURE,
        payload: error,
        error: true,
    }
}

export function updateBooth(snapshot) {
    return {
        type: Actions.UPDATE_BOOTH,
        payload: {
            boothId: snapshot.key,
            boothValue: snapshot.val()
        }
    }
}

export function updateOwnPins(snapshot) {
    return {
        type: Actions.UPDATE_OWN_PINS,
        payload: {
            value: snapshot.val()
        }
    }
}

export function updateOwnLikes(snapshot) {
    return {
        type: Actions.UPDATE_OWN_LIKES,
        payload: {
            value: snapshot.val()
        }
    }
}

/**
 *
 * @param boothId
 */
export function pinBooth(boothId) {
    return function (dispatch) {
        dispatch(postBoothPinRequest());

        return getCurrentUser()
            .then((user) => {
                const updates = {};
                updates[`/booths/${boothId}/pins`] = {
                    [user.uid]: true
                };
                updates[`/users/${user.uid}/pins`] = {
                    [boothId]: true,
                };

                return app.database().ref().update(updates);
            })
            .then(() => {
                console.log("Success to post pin booth. ID: " + boothId);
                dispatch(postBoothPinSuccess(boothId));
            })
            .catch((e) => {
                console.error(e);
                dispatch(postBoothPinFailure());
            });
    }
}

function postBoothPinRequest() {
    return {type: Actions.POST_BOOTH_PIN_REQUEST}
}


function postBoothPinSuccess(boothId) {
    return {
        type: Actions.POST_BOOTH_PIN_SUCCESS,
    }
}

function postBoothPinFailure(error) {
    return {
        type: Actions.POST_BOOTH_PIN_FAILURE,
        payload: error,
        error: true,
    }
}

function getCurrentUser() {
    return new Promise(function (onFulfilled, onRejected) {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                onFulfilled(user);
            } else {
                // No user is signed in.
                // TODO: handle to failure post.
                onRejected();
            }
        });
    });
}

// ---------------------------------------------------------------------------
// reducer
// ---------------------------------------------------------------------------
const initialStateRecord = Record({
    loading: false,
    login: null,
    pins: Map({}),
    likes: Map({}),
    questions: Map({}),
    booths: Map({})
});

export default function reducer(state = new initialStateRecord(), action) {
    const {type, payload} = action;
    switch (type) {
        case Actions.LOGIN_REQUEST:
        case Actions.LOGIN_FAILURE:
        case Actions.LOAD_QUESTIONS_REQUEST:
        case Actions.LOAD_QUESTIONS_FAILURE:
        case Actions.LOAD_BOOTHS_REQUEST:
        case Actions.LOAD_BOOTHS_FAILURE:
            // TODO implement
            return state;

        case Actions.LOGIN_SUCCESS:
            return state
                .set('loading', false)
                .set('login', new FirebaseUser(payload.login));

        case Actions.LOAD_QUESTIONS_SUCCESS:
            const {questionsValue} = payload;
            const currentQuestions = state.get('questions');
            const updatedQuestions = currentQuestions.withMutations((map) => {
                Object
                    .keys(questionsValue)
                    .forEach(key => map.set(key, new Question(questionsValue[key])));
            });

            return state
                .set('loading', false)
                .set('questions', updatedQuestions);

        case Actions.LOAD_BOOTHS_SUCCESS:
            const {boothsValue} = payload;
            const currentBooths = state.get('questions');
            const updatedBooths = currentBooths.withMutations((map) => {
                Object
                    .keys(boothsValue)
                    .forEach(key => map.set(key, new Booth(boothsValue[key])));
            });

            return state
                .set('loading', false)
                .set('booths', updatedBooths);

        case Actions.UPDATE_BOOTH:
            return state.setIn(['booths', payload.boothId], new Booth(payload.boothValue));

        case Actions.UPDATE_OWN_PINS:
            return state.set('pins', Map(payload.value));

        case Actions.UPDATE_OWN_LIKES:
            return state.set('likes', Map(payload.value));

        default:
            return state;
    }
}