import React from 'react';
import classes from './Loading.module.css';

export default function Loading() {
	return (
		<div className={classes.center}>
			<div className={classes['lds-ellipsis']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
