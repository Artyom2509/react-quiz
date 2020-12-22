import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/auth';
import { alertHandler } from './../../store/actions/alert';

class Logout extends Component {
	componentDidMount() {
		this.props.logout();
		this.props.alertHandler(`Вы не авторизованы!`, 'Error', 5000);
	}

	render() {
		return <Redirect to="/" />;
	}
}

const mapDispatchToProps = {
	logout,
	alertHandler,
};

export default connect(null, mapDispatchToProps)(Logout);
