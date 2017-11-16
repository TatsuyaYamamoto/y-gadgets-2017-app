import {Record, Map, is} from 'immutable';

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export const Actions = {
    INPUT_ANSWER: 'y-gadgets/mystery/INPUT_ANSWER',
    CHECK_COMPLETE: 'y-gadgets/mystery/CHECK_COMPLETE',
};

// ---------------------------------------------------------------------------
// Action creators
// ---------------------------------------------------------------------------
/**
 * Check that the user already resolved all question.
 *
 * @returns {Function}
 */
export function init() {
    return {
        type: Actions.CHECK_COMPLETE,
        payload: {
            isCompleted: !!localStorage.getItem('is_mystery_completed')
        }
    };
}

/**
 *
 * @param questionId
 * @param value
 * @returns {Function}
 */
export function inputAnswer(questionId, value) {
    return function (dispatch) {
        // TODO: validate and format value

        dispatch({
            type: Actions.INPUT_ANSWER,
            payload: {
                questionId,
                value
            }
        });
        dispatch(checkComplete());
    }
}

/**
 *
 * @returns {Function}
 */
export function checkComplete() {
    return function (dispatch, getState) {
        const expected = getState().firebase.get('questions').map((q) => q.answer);
        const actual = getState().mystery.get('userAnswers');
        const isCompleted = is(expected, actual);

        if (isCompleted) {
            console.log('Complete to resolve all question!');
            localStorage.setItem('is_mystery_completed', true);
        }

        dispatch({
            type: Actions.CHECK_COMPLETE,
            payload: {isCompleted}
        });
    };
}

// ---------------------------------------------------------------------------
// reducer
// ---------------------------------------------------------------------------
const InitialStateRecord = Record({
    userAnswers: Map({}),
    isCompleted: false,
});

export default function reducer(state = new InitialStateRecord(), action) {
    const {type, payload} = action;
    switch (type) {
        case Actions.INPUT_ANSWER:
            const {questionId, value} = payload;
            return state.setIn(['userAnswers', questionId], value);

        case Actions.CHECK_COMPLETE:
            const {isCompleted} = payload;
            return state.set('isCompleted', isCompleted);

        default:
            return state;
    }
}