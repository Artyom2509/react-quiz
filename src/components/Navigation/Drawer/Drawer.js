import React, { Component } from 'react';
import classes from './Drawer.module.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

export default class Drawer extends Component {
	clickHandler = () => {
		this.props.onClose();
	};

	renderLinks(links) {
		return links.map((link, idx) => (
			<li key={idx}>
				<NavLink
					to={link.to}
					exact={link.exact}
					activeClassName={classes.active}
					onClick={this.clickHandler}>
					{link.label}
				</NavLink>
			</li>
		));
	}

	render() {
		const cls = [classes.Drawer];
		const showBackdrop = this.props.isOpen ? (
			<Backdrop onClick={this.props.onClose} />
		) : null;

		if (!this.props.isOpen) {
			cls.push(classes.close);
		}

		let links = [{ to: '/', label: 'Список', exact: true }];

		if (this.props.isAuthenticated) {
			links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false });
			links.push({ to: '/logout', label: 'Выйти', exact: false });
		} else {
			links.push({ to: '/auth', label: 'Авторизация', exact: false });
		}

		return (
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks(links)}</ul>
				</nav>
				{showBackdrop}
			</React.Fragment>
		);
	}
}
