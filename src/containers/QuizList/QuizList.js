import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';
import Loading from '../../components/UI/Loading/Loading';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {
	renderQuizes() {
		return this.props.quizes.map((quiz) => (
			<li key={quiz.id}>
				<NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
			</li>
		));
	}

	componentDidMount() {
		this.props.fetchQuizes();
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Список тестов</h1>
					<ul>
						{this.props.isLoaded && this.props.quizes.length !== 0 ? (
							this.renderQuizes()
						) : (
							<Loading />
						)}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	quizes: state.quiz.quizes,
	isLoaded: state.quiz.isLoaded,
});

const mapDispatchToProps = {
	fetchQuizes,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
