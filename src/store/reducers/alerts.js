import { ALERT_SHOW, ALERT_HIDE } from '../actions/actionTypes';

const initialState = [];

const handlers = {
	[ALERT_HIDE]: (state, {id}) => [...state].filter((el) => el.id !== id),
	[ALERT_SHOW]: (state, {alert}) => [...state, alert],
	DEFAULT: (state) => state,
};

const alertReducer = (state = initialState, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default alertReducer;
