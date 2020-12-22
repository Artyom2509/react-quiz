import { ALERT_SHOW, ALERT_HIDE } from '../actions/actionTypes';

const initialState = {
	show: false,
	model: null,
	message: null,
};

const handlers = {
	[ALERT_HIDE]: (state) => ({ ...state, show: false, message: null }),
	[ALERT_SHOW]: (state, { message, model }) => ({
		...state,
		show: true,
		message,
		model,
	}),
	DEFAULT: (state) => state,
};

const alertReducer = (state = initialState, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};

export default alertReducer;
