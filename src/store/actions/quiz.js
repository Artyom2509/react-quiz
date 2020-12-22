import axios from '../../server/axios-quiz';
import { alertHandler } from './alert';
import {
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_ERROR,
	FETCH_QUIZ_SUCCESS,
	QUIZ_FINISH,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY,
	QUIZ_SET_STATE,
} from './actionTypes';

export const fetchQuizes = () => {
	return async (dispatch) => {
		dispatch(fetchQuizesStart());
		try {
			const response = await axios.get('/quizes.json');
			let quizes = [];

			Object.keys(response.data).forEach((key, idx) => {
				const creator = response.data[key][0].creator;
				quizes.push({
					id: key,
					name: `Тест №${idx + 1}.  Создатель: ${creator || 'Аноним'}`,
				});
			});

			dispatch(fetchQuizesSucces(quizes));
		} catch (error) {
			dispatch(fetchQuizesError(error));
			alertHandler(`${error}`, 'Error')(dispatch);
		}
	};
};

export const fetchQuizById = (quizId) => {
	return async (dispatch) => {
		dispatch(fetchQuizesStart());

		try {
			const response = await axios.get(`/quizes/${quizId}.json`);
			const quiz = response.data;
			dispatch(fetchQuizSuccess(quiz));
		} catch (error) {
			dispatch(fetchQuizError(error));
		}
	};
};

export const quizSetState = (answersState, results) => ({
	type: QUIZ_SET_STATE,
	answersState,
	results,
});

export const quizAnswerClick = (answerId) => {
	return (dispatch, getState) => {
		const state = getState().quiz;

		if (state.answersState) {
			const key = Object.keys(state.answersState)[0];
			if (state.answersState[key] === 'success') {
				return;
			}
		}

		const question = state.quiz[state.activeQuestion];
		const results = state.results;

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}

			dispatch(quizSetState({ [answerId]: 'success' }, results));
			alertHandler(`Правильный ответ`, 'Success')(dispatch);

			const timeout = setTimeout(() => {
				if (isQuizFinished(state)) {
					dispatch(finishQuiz());
				} else {
					dispatch(quizNextQuestion(state.activeQuestion + 1));
				}
				clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = 'error';
			dispatch(quizSetState({ [answerId]: 'error' }, results));
			alertHandler(`Неправильный ответ`, 'Error')(dispatch);
		
			if (state.answersState) {
				const key = Object.keys(state.answersState)[0];
				if (state.answersState[key] === 'error') {
					alertHandler(`Выберите правильный ответ`)(dispatch);
					return;
				}
			}
		}
	};
};

const isQuizFinished = (state) =>
	state.activeQuestion + 1 === state.quiz.length;

export const quizNextQuestion = (number) => ({
	type: QUIZ_NEXT_QUESTION,
	number,
});

export const finishQuiz = () => ({
	type: QUIZ_FINISH,
});

export const fetchQuizesStart = (fff) => ({
	type: FETCH_QUIZES_START,
	fff,
});

export const fetchQuizesSucces = (quizes) => ({
	type: FETCH_QUIZES_SUCCESS,
	quizes,
});

export const fetchQuizSuccess = (quiz) => ({
	type: FETCH_QUIZ_SUCCESS,
	quiz,
});

export const retryQuiz = () => ({
	type: QUIZ_RETRY,
});

export const fetchQuizError = (error) => ({
	type: FETCH_QUIZ_ERROR,
	error,
});

export const fetchQuizesError = (error) => ({
	type: FETCH_QUIZES_ERROR,
	error,
});
