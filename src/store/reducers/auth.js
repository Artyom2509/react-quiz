import { AUTH_LOGOUT, AUTH_SUCCESS } from '../actions/actionTypes';

const initialState = {
	token: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, token }) => {
	switch (type) {
		case AUTH_SUCCESS:
			return { ...state, token };

		case AUTH_LOGOUT:
			return { ...state, token: null };

		default:
			return state;
	}
};
