import React from 'react';
import classes from './Select.module.css';

export default function Select(props) {
	const htmlFor = `${props.label}-${Math.random()}`;

	return (
		<div className={classes.Select}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<select id={htmlFor} value={props.value} onChange={props.onChange}>
				{props.options.map((option, idx) => (
					<option key={option.text + idx} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}
