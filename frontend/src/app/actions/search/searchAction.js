import * as types from '../index';

export const searchAction = (search) => {
    return {
        type: types.SEARCH_ACTION,
        search
    }
};