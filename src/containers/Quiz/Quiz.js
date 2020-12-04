import React, { Component } from 'react';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import classes from './Quiz.module.css';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loading from '../../components/UI/Loading/Loading';
import { connect } from 'react-redux';
import {
	fetchQuizById,
	quizAnswerClick,
	retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.retryQuiz();
	}

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length;
	}

	retryHandler = () => {
		const timeout = setTimeout(() => {
			this.props.retryQuiz();
			clearTimeout(timeout);
		}, 1000);
	};

	render() {
		const {
			quiz,
			activeQuestion,
			answersState,
			results,
			isLoaded,
			isFinished,
		} = this.props;

		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>JavaScript Quiz</h1>
					<h3>Ответьте на все вопросы</h3>
					{!isLoaded || !this.props.quiz ? (
						<Loading />
					) : isFinished ? (
						<FinishedQuiz
							results={results}
							quiz={quiz}
							onRetry={this.retryHandler}
						/>
					) : (
						<ActiveQuiz
							question={quiz[activeQuestion].question}
							answers={quiz[activeQuestion].answers}
							onAnswerClick={this.props.quizAnswerClick}
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

const mapStateToProps = (state) => ({
	results: state.quiz.results,
	isFinished: state.quiz.isFinished,
	activeQuestion: state.quiz.activeQuestion,
	answersState: state.quiz.answersState,
	quiz: state.quiz.quiz,
	isLoaded: state.quiz.isLoaded,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchQuizById: (id) => dispatch(fetchQuizById(id)),
		quizAnswerClick: (id) => dispatch(quizAnswerClick(id)),
		retryQuiz: () => dispatch(retryQuiz()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
