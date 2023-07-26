import * as types from '../../actions/index.js';

export default function dataReducer(state = {}, action) {
    switch (action.type) {
        case types.DATA_ACTION:
            return action.data;
        default:
            return state;
    }
}