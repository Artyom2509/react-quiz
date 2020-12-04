import { RESET_QUIZ_CREATION, QUIZ_QUESTION_CREATE } from './actionTypes';
import axios from '../../server/axios-quiz';

export const createQuizQuestion = (item) => ({
	type: QUIZ_QUESTION_CREATE,
	item,
});

export const finishCreateQuiz = () => async (dispatch, getState) => {
	try {
    await axios.post(`/quizes.json`, getState().create.quiz);
    dispatch(resetQuizCreation())
	} catch (error) {
		console.log(error);
	}
};

export const resetQuizCreation = () => ({
	type: RESET_QUIZ_CREATION,
});
