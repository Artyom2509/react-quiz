import {
	RESET_QUIZ_CREATION,
	QUIZ_QUESTION_CREATE,
} from '../actions/actionTypes';

const initialState = {
	quiz: [],
};

const createReducer = (state = initialState, { type, item }) => {
	switch (type) {
		case QUIZ_QUESTION_CREATE:
			return { ...state, quiz: [...state.quiz, item ] };

		case RESET_QUIZ_CREATION:
			return { ...state, quiz: [] };

		default:
			return state;
	}
};

export default createReducer;
