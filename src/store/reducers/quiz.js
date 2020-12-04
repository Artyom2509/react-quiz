import {
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_SUCCESS,
	FETCH_QUIZ_ERROR,
	QUIZ_SET_STATE,
	QUIZ_FINISH,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY,
} from '../actions/actionTypes';

const initialState = {
	quizes: [],
	isLoaded: true,
	results: {},
	error: null,
	isFinished: false,
	activeQuestion: 0,
	answersState: null,
	quiz: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
	state = initialState,
	{ type, error, quizes, quiz, answersState, results, number }
) => {
	switch (type) {
		case FETCH_QUIZES_START:
			return { ...state, isLoaded: false };

		case FETCH_QUIZES_SUCCESS:
			return { ...state, quizes, isLoaded: true };

		case FETCH_QUIZES_ERROR:
			return { ...state, error, isLoaded: false };

		case FETCH_QUIZ_SUCCESS:
			return { ...state, quiz, isLoaded: true };

		case FETCH_QUIZ_ERROR:
			return { ...state, error, isLoaded: false };

		case QUIZ_SET_STATE:
			return { ...state, answersState, results };

		case QUIZ_FINISH:
			return { ...state, isFinished: true };

		case QUIZ_NEXT_QUESTION:
			return { ...state, activeQuestion: number, answersState: null };

		case QUIZ_RETRY:
			return {
				...state,
				results: {},
				isFinished: false,
				activeQuestion: 0,
				answersState: null,
			};

		default:
			return state;
	}
};
