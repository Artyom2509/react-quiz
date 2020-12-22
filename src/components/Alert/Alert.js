import React from 'react';
import { connect } from 'react-redux';
import classes from './Alert.module.css';
import { alertHide } from '../../store/actions/alert';

function Alert({ isShow, message, alertHide, model }) {
	const cls = [classes.Alert, classes[model]];

	if (isShow) {
		return (
			<div className={cls.join(' ')}>
				<button onClick={alertHide}>x</button>
				{message}
			</div>
		);
	}
	return null;
}

const mapStateToProps = ({ alert }) => ({
	isShow: alert.show,
	model: alert.model,
	message: alert.message,
});

const mapDispatchToProps = {
	alertHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
