import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Alert.module.css';
import { alertHide } from '../../store/actions/alert';

function Alert({ id, message, alertHide, model }) {
	const cls = [classes.Alert, classes[model]];
	const interval = useRef(null);
	const interval2 = useRef(null);
	const timer = useRef(4);
	const lineWidth = useRef(100);
	const [width, setWidth] = useState(100);

	useEffect(() => {
		startTimer();
		return () => stopTimer();
	}, []);

	const startTimer = () => {
		interval.current = setInterval(tickHandler, 1000);
		interval2.current = setInterval(
			animationHandler,
			(timer.current / 100) * 1000
		);
	};

	const stopTimer = () => {
		clearInterval(interval.current);
		clearInterval(interval2.current);
	};

	const hideAlert = () => {
		stopTimer();
		alertHide(id);
	};

	const tickHandler = () => {
		timer.current = timer.current - 1;

		if (timer.current <= 0) hideAlert();
	};

	const animationHandler = () => {
		lineWidth.current = lineWidth.current - 1;
		setWidth(lineWidth.current);
		if (lineWidth.current <= 0) hideAlert();
	};

	return (
		<div
			className={cls.join(' ')}
			onMouseEnter={stopTimer}
			onMouseLeave={startTimer}
			onClick={hideAlert}>
			<button onClick={hideAlert}>x</button>
			{message}
			<div
				className={classes.Line}
				style={{
					width: `${width}%`,
				}}
			/>
		</div>
	);
}

const mapDispatchToProps = {
	alertHide,
};

export default connect(null, mapDispatchToProps)(Alert);
