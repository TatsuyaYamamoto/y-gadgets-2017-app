import {Record, List} from 'immutable';

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export const Actions = {
    INPUT_SEARCH_QUERY: 'y-gadgets/booth/INPUT_SEARCH_QUERY',
    SELECT_SEARCH_CATEGORY: 'y-gadgets/booth/SELECT_SEARCH_CATEGORY',
    CLEAN_SEARCH_CONDITIONS: 'y-gadgets/booth/CLEAN_SEARCH_CONDITIONS',
    UPDATE_SHOWABLE_BOOTH_IDS: 'y-gadgets/booth/UPDATE_SHOWABLE_BOOTH_IDS',
};

// ---------------------------------------------------------------------------
// Action creators
// ---------------------------------------------------------------------------

export function search(query) {
    return function (dispatch) {
        // TODO trim.... etc.

        dispatch({
            type: Actions.INPUT_SEARCH_QUERY,
            payload: {
                query
            }
        });

        dispatch(filterShowableBoothList());
    }
}

export function selectCategory(categoryName) {
    return function (dispatch, getState) {

        // TODO validation
        dispatch({
            type: Actions.SELECT_SEARCH_CATEGORY,
            payload: {
                category: categoryName
            }
        });

        dispatch(filterShowableBoothList());
    }
}

export function clearSearchCondition() {
    return function (dispatch, getState) {
        dispatch({
            type: Actions.CLEAN_SEARCH_CONDITIONS,
        });
        dispatch(filterShowableBoothList());
    }
}


function filterShowableBoothList() {
    return function (dispatch, getState) {
        const {firebase, booth} = getState();
        const {booths} = firebase;
        const {query, category} = booth;

        const filteredBoothIds = booths.filter((b) => {
            let showable = b.name.indexOf(query) !== -1 ||
                b.locationName.indexOf(query) !== -1 ||
                b.owner.indexOf(query) !== -1 ||
                b.description.indexOf(query) !== -1;

            if (category !== 'all') {
                showable = b.category === category
            }

            return showable;
        });

        dispatch({
            type: Actions.UPDATE_SHOWABLE_BOOTH_IDS,
            payload: {filteredBoothIds}
        })
    }
}

// ---------------------------------------------------------------------------
// reducer
// ---------------------------------------------------------------------------
const InitialStateRecord = Record({
    query: '',
    category: undefined,
    filteredBoothIds: List()
});

export default function reducer(state = new InitialStateRecord(), action) {
    const {type, payload} = action;
    switch (type) {
        case Actions.INPUT_SEARCH_QUERY:
            return state.set('query', payload.query);

        case Actions.SELECT_SEARCH_CATEGORY:
            return state.set('category', payload.category);

        case Actions.CLEAN_SEARCH_CONDITIONS:
            return state
                .set('query', '')
                .set('category', undefined);

        case Actions.UPDATE_SHOWABLE_BOOTH_IDS:
            return state.set('filteredBoothIds', payload.filteredBoothIds);

        default:
            return state;
    }
}