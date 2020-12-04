import { combineReducers } from 'redux';
import quiz from './quiz';
import create from './create';
import auth from './auth';

export default combineReducers({
	quiz,
	create,
	auth,
});
