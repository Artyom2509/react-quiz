import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';

export default class QuizList extends Component {
	renderQuizes() {
		return [1, 2, 3].map((quiz, idx) => (
			<li key={idx}>
				<NavLink to={'/quiz/' + quiz}>Test {quiz}</NavLink>
			</li>
		));
	}

	componentDidMount() {
		fetch('https://react-quiz-61520.firebaseio.com/quiz.json')
			.then((response) => response.json())
			.then((json) => console.log(json));
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Список тестов</h1>
					<ul>{this.renderQuizes()}</ul>
				</div>
			</div>
		);
	}
}
