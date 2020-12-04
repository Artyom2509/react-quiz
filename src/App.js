import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { compose } from 'redux';
import { autoLogin, checkAuth } from './store/actions/auth';

class App extends Component {
	componentDidMount() {
		this.props.autoLogin();
		this.props.checkAuth();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/quiz/:id" component={Quiz} />
				<Route path="/" component={QuizList} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/quiz-creator" component={QuizCreator} />
					<Route path="/quiz/:id" component={Quiz} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={QuizList} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return <Layout>{routes}</Layout>;
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
	autoLogin: () => dispatch(autoLogin()),
	checkAuth: () => dispatch(checkAuth()),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(App);
