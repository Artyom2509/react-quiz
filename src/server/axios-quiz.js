import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-quiz-61520.firebaseio.com',
});

export default instance;
