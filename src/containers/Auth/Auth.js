import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите коректный Емайл',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите коректный Пароль',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	};

	isEmailAddress(email) {
		let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return pattern.test(email);
	}

	validateControl = (value, validation) => {
		if (!validation) return true;
		let isValid = true;
		if (validation.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (validation.email) {
			isValid = this.isEmailAddress(value);
		}
		if (validation.minLength) {
			isValid = value.length > validation.minLength && isValid;
		}

		return isValid;
	};

	onChangeHandler = (event, controlName) => {
		this.setState(({ formControls }) => {
			const control = { ...formControls[controlName] };
			control.value = event.target.value;
			control.touched = true;
			control.valid = this.validateControl(control.value, control.validation);

			formControls[controlName] = control;

			let isFormValid = true;
			Object.keys(formControls).forEach((name) => {
				isFormValid = formControls[name].valid && isFormValid;
			});

			return { isFormValid, formControls };
		});
	};

	renderInputs = () => {
		const inputs = Object.keys(this.state.formControls).map(
			(controlName, idx) => {
				const control = this.state.formControls[controlName];
				return (
					<Input
						key={controlName + idx}
						{...control}
						shouldValidate={!!control.validation}
						onChange={(event) => this.onChangeHandler(event, controlName)}
					/>
				);
			}
		);
		return inputs;
	};

	loginHandler = () => {
		const { email, password } = this.state.formControls;
		this.props.auth(email.value, password.value, true);
	};

	registrHandler = () => {
		const { email, password } = this.state.formControls;
		this.props.auth(email.value, password.value, false);
	};

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Authorization</h1>
					<form
						className={classes.AuthForm}
						onSubmit={(e) => e.preventDefault()}>
						{this.renderInputs()}

						<Button
							type="success"
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}>
							Login
						</Button>
						<Button
							type="primary"
							onClick={this.registrHandler}
							disabled={!this.state.isFormValid}>
							Registration
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
});

export default connect(null, mapDispatchToProps)(Auth);
