import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDDO2WVXaNjm_HNNQtFgerCyeN8CTF3PV8',
	authDomain: 'react-quiz-61520.firebaseapp.com',
	databaseURL: 'https://react-quiz-61520.firebaseio.com',
	projectId: 'react-quiz-61520',
	storageBucket: 'react-quiz-61520.appspot.com',
	messagingSenderId: '971455584706',
	appId: '1:971455584706:web:76640f3426997a8490de5b',
	measurementId: 'G-BYDJTD90XS',
};

firebase.initializeApp(firebaseConfig);
