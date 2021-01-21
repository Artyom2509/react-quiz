import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Alert from './Alert';
import classes from './Alert.module.css';

function Warning() {
	const alerts = useSelector((state) => state.alerts);

	const showAlerts = useCallback(
		() => alerts.map((alert) => <Alert key={alert.id} {...alert} />),
		[alerts]
	);

	return (
		<div className={classes.Warning}>
			<div>{showAlerts()}</div>
		</div>
	);
}

export default Warning;
