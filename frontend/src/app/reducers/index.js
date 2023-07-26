import { combineReducers } from 'redux';
import dataReducer from './data/dataReducer';
import searchReducer from './search/searchReducer';

export default combineReducers({data: dataReducer, search: searchReducer});