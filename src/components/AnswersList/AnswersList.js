import React from 'react';
import { AnswerItem } from '../AnswerItem/AnswerItem';
import classes from './AnswersList.module.css';

export const AnswersList = (props) => {
	return (
		<ul className={classes.AnswersList}>
			{props.answers.map(({ id, text }) => (
				<AnswerItem
					key={id}
					text={text}
					onAnswerClick={() => props.onAnswerClick(id)}
					state={props.state ? props.state[id] : null}
				/>
			))}
		</ul>
	);
};
