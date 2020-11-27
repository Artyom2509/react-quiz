import React from 'react';
import { AnswersList } from '../AnswersList/AnswersList';
import styles from './ActiveQuiz.module.css';

export const ActiveQuiz = ({
	answerNumber,
	question,
	quizLength,
	answers,
	onAnswerClick,
	state,
}) => {
	return (
		<div className={styles.ActiveQuiz}>
			<p className={styles.Question}>
				<span>
					<strong>{answerNumber}.</strong>&nbsp; {question}
				</span>
				<small>
					{answerNumber} из {quizLength}
				</small>
			</p>
			<AnswersList
				answers={answers}
				onAnswerClick={onAnswerClick}
				state={state}
			/>
		</div>
	);
};
