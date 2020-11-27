import React, { Component } from 'react';
import axios from 'axios'
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {
	createControl,
	validate,
	validateForm,
} from '../../form/formFramework';

function createOptionControl(number) {
	return createControl(
		{
			id: number,
			label: `Вариант ${number}`,
			errorMessage: 'Значение не может быть пустым ',
		},
		{ required: true }
	);
}

function createFormControls() {
	return {
		question: createControl(
			{
				label: 'Введите вопрос',
				errorMessage: 'Вопрос не может быть пустым',
			},
			{ required: true }
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	};
}

export default class QuizCreator extends Component {
	state = {
		quiz: [],
		rightAnswerId: 1,
		isFormValid: false,
		formControls: createFormControls(),
	};

	addQuestionHandler = () => {
		const {
			question,
			option1,
			option2,
			option3,
			option4,
		} = this.state.formControls;
		const quiz = this.state.quiz.concat();
		const index = quiz.length + 1;

		const questionItem = {
			id: index,
			question: question.value,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{
					id: option1.id,
					text: option1.value,
				},
				{
					id: option2.id,
					text: option2.value,
				},
				{
					id: option3.id,
					text: option3.value,
				},
				{
					id: option4.id,
					text: option4.value,
				},
			],
		};
		quiz.push(questionItem);

		this.setState({
			quiz,
			rightAnswerId: 1,
			isFormValid: false,
			formControls: createFormControls(),
		});
	};

	createQuizHandler = () => {
		console.log(this.state.quiz)
	};

	selectChangeHandler = (event) => {
		this.setState({ rightAnswerId: +event.target.value });
	};

	changeHandler = (event, controlName) => {
		this.setState(({ formControls }) => {
			const control = { ...formControls[controlName] };
			control.value = event.target.value;
			control.touched = true;
			control.valid = validate(control.value, control.validation);

			formControls[controlName] = control;

			return { isFormValid: validateForm(formControls), formControls };
		});
	};

	renderControls = () => {
		return Object.keys(this.state.formControls).map((controlName, idx) => {
			const control = this.state.formControls[controlName];

			return (
				<React.Fragment key={controlName + idx}>
					<Input
						{...control}
						shouldValidate={!!control.validation}
						onChange={(event) => this.changeHandler(event, controlName)}
					/>
					{idx === 0 ? <hr /> : null}
				</React.Fragment>
			);
		});
	};

	render() {
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание теста</h1>
					<form onSubmit={(event) => event.preventDefault()}>
						{this.renderControls()}

						<Select
							label="Выберите правильный ответ"
							value={this.state.rightAnswerId}
							onChange={this.selectChangeHandler}
							options={[
								{ text: 1, value: 1 },
								{ text: 2, value: 2 },
								{ text: 3, value: 3 },
								{ text: 4, value: 4 },
							]}
						/>

						<Button
							type="primary"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}>
							Добавить вопрос
						</Button>
						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.state.quiz.length === 0}>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		);
	}
}
