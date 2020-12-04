import firebase from 'firebase/app';
import 'firebase/auth';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

const fbAuth = () => firebase.auth();

export const auth = (email, password, isLogin) => {
	return async (dispatch) => {
		const authPromise = isLogin
			? fbAuth().signInWithEmailAndPassword(email, password)
			: fbAuth().createUserWithEmailAndPassword(email, password);

		try {
			const data = await authPromise;
			const timeout = +data.user.metadata.b + 180000;
			const expirationDate = new Date(timeout);

			window.localStorage.setItem('uid', data.user.uid);
			window.localStorage.setItem('token', data.user.a.c);
			window.localStorage.setItem('email', data.user.email);
			window.localStorage.setItem('expirationDate', expirationDate);

			dispatch(authSuccess(data.user.a.c));
			dispatch(autoLogout(180000));
		} catch (error) {
			console.log('auth -> error', error);
		}
	};
};

export const authSuccess = (token) => ({
	type: AUTH_SUCCESS,
	token,
});

const autoLogout = (time) => (dispatch) => {
	setTimeout(() => {
		dispatch(logout());
	}, time);
};

export const autoLogin = () => (dispatch) => {
	dispatch(checkAuth());
};

export const checkAuth = () => (dispatch) => {
	let timeout;
	const now = new Date().getTime();
	const localtime = new Date(
		window.localStorage.getItem('expirationDate')
	).getTime();

	const fn = () => {
		if (localtime < now) dispatch(logout());
		clearTimeout(timeout);
	};
	clearTimeout(timeout);

	if (!localtime) {
		dispatch(logout());
	} else {
		dispatch(authSuccess(localStorage.getItem('token')));
		fn();
		timeout = setTimeout(fn, localtime - now);
	}
};

export const logout = () => {
	window.localStorage.removeItem('uid');
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('email');
	window.localStorage.removeItem('expirationDate');

	return {
		type: AUTH_LOGOUT,
	};
};
