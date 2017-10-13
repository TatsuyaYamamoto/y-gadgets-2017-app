/**
 * @fileOverview User
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.User
 */
import {Record} from 'immutable';

const FirebaseUserRecord = Record({
    uid: null,
});

export default class FirebaseUser extends FirebaseUserRecord {
    constructor(params) {
        super(params);
    }
}