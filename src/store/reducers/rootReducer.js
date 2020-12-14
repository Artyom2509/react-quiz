import { combineReducers } from 'redux';
import quiz from './quiz';
import create from './create';
import auth from './auth';

// eslint-disable-next-line import/no-anonymous-default-export
export default combineReducers({
	quiz,
	create,
	auth,
});
