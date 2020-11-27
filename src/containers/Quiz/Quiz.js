import React, { Component } from 'react';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import classes from './Quiz.module.css';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQuestion: 0,
		answersState: null,
		quiz: [
			{
				id: 1,
				question: 'Как поживаешь?',
				rightAnswer: 2,
				answers: [
					{ id: 1, text: 'first' },
					{ id: 2, text: 'second' },
					{ id: 3, text: 'third' },
					{ id: 4, text: 'foth' },
				],
			},
			{
				id: 2,
				question: 'В каком году основали Санкт-Петербург?',
				rightAnswer: 2,
				answers: [
					{ id: 1, text: '1700' },
					{ id: 2, text: '1702' },
					{ id: 3, text: '1703' },
					{ id: 4, text: '1803' },
				],
			},
			{
				id: 3,
				question: 'Как поживаешь?',
				rightAnswer: 2,
				answers: [
					{ id: 1, text: 'first' },
					{ id: 2, text: 'second' },
					{ id: 3, text: 'third' },
					{ id: 4, text: 'foth' },
				],
			},
		],
	};

	componentDidMount() {
		console.log(this.props);
		console.log(this.props.match.params.id);
	}
	

	onAnswerClickHandler = (answerId) => {
		if (this.state.answersState) {
			const key = Object.keys(this.state.answersState)[0];
			if (this.state.answersState[key] === 'success') {
				return;
			}
		}

		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;

		if (question.rightAnswer === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}

			this.setState({
				answersState: { [answerId]: 'success' },
				results,
			});

			const timeout = setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({ isFinished: true });
				} else {
					this.setState((state) => ({
						activeQuestion: state.activeQuestion + 1,
						answersState: null,
					}));
				}
				clearTimeout(timeout);
			}, 1000);
		} else {
			results[question.id] = 'error';
			this.setState({
				answersState: { [answerId]: 'error', results },
			});
		}
	};

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	}

	retryHandler = () => {
		const timeout = setTimeout(() => {
			this.setState({
				activeQuestion: 0,
				answersState: null,
				isFinished: false,
				results: {},
			});
			clearTimeout(timeout);
		}, 1000);
	};

	render() {
		const { quiz, activeQuestion, answersState } = this.state;

		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>JavaScript Quiz</h1>
					<h3>Ответьте на все вопросы</h3>

					{this.state.isFinished ? (
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHandler}
						/>
					) : (
						<ActiveQuiz
							question={quiz[activeQuestion].question}
							answers={quiz[activeQuestion].answers}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={quiz.length}
							answerNumber={activeQuestion + 1}
							state={answersState}
						/>
					)}
				</div>
			</div>
		);
	}
}
