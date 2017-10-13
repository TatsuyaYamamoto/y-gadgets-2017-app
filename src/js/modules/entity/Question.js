/**
 * @fileOverview Question resource based on firebase.database.DataSnapshot
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
 */
import {Record} from 'immutable';

const QuestionRecord = Record({
    sentence: null,
    answer: null,
    correct_message: null,
});

export default class Question extends QuestionRecord {
    constructor(params) {
        super(params);
    }
}
