import {Record, Map} from 'immutable';

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export const Actions = {
    INPUT_ANSWER: 'y-gadgets/mystery/INPUT_ANSWER',
};

// ---------------------------------------------------------------------------
// Action creators
// ---------------------------------------------------------------------------
export function inputAnswer(questionId, value) {
    // TODO: validate and format value

    return {
        type: Actions.INPUT_ANSWER,
        payload: {
            questionId,
            value
        }

    }
}

// ---------------------------------------------------------------------------
// reducer
// ---------------------------------------------------------------------------
const InitialStateRecord = Record({
    userAnswers: Map({}),
    expectedAnswers: Map({}),
});

export default function reducer(state = new InitialStateRecord(), action) {
    const {type, payload} = action;
    switch (type) {
        case Actions.INPUT_ANSWER:
            const {questionId, value} = payload;
            return state.setIn(['userAnswers', questionId], value);

        default:
            return state;
    }
}