import * as types from '../../actions';

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case types.SEARCH_ACTION:
        return action.search;
        default:
        return state;
    }
}