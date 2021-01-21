import { ALERT_SHOW, ALERT_HIDE } from './actionTypes';

export const alertHandler = (message, model = 'Default') => (dispatch) => {
	const id = parseInt(Math.random() * 10000);
	dispatch(alertShow(id, message, model));
};

export const alertShow = (id, message, model = 'Default') => ({
	type: ALERT_SHOW,
	alert: { id, message, model },
});

export const alertHide = (id) => ({
	type: ALERT_HIDE,
	id,
});
