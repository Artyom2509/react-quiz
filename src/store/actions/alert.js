import { ALERT_SHOW, ALERT_HIDE } from './actionTypes';

export const alertHandler = (message, model = 'Default', time = 3000) => (dispatch) => {
	dispatch(alertShow(message, model));

	setTimeout(() => {
		dispatch(alertHide());
	}, time);
};

export const alertShow = (message, model) => ({
	type: ALERT_SHOW,
	message,
	model,
});

export const alertHide = () => ({
	type: ALERT_HIDE,
});
