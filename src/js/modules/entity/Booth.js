/**
 * @fileOverview Booth resource based on firebase.database.DataSnapshot
 *
 * @see https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
 */
import {Record, Map} from 'immutable';

const BoothRecord = Record({
    name: null,
    locationName: null,
    owner: null,
    description: null,
    likes: Map({}),
    visibilities: Map({}),
});

export default class Booth extends BoothRecord {
    constructor(params) {
        return super(params)
            .set('likes', Map(params.likes))
            .set('visibilities', Map(params.visibilities));
    }
}
