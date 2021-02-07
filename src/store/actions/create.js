import { RESET_QUIZ_CREATION, QUIZ_QUESTION_CREATE } from './actionTypes';
import axios from '../../server/axios-quiz';
import { alertHandler } from './alert';

export const createQuizQuestion = (item) => ({
	type: QUIZ_QUESTION_CREATE,
	item,
});

export const finishCreateQuiz = () => async (dispatch, getState) => {
	try {
    await axios.post(`/quizes.json`, getState().create.quiz);
		dispatch(resetQuizCreation())
		alertHandler(`Quiz создан успешно`, 'Success',)(dispatch);
	} catch (error) {
		alertHandler(`${error}`, 'Error',)(dispatch);
	}
};

export const resetQuizCreation = () => ({
	type: RESET_QUIZ_CREATION,
});
