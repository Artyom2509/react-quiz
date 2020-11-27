import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

export default class Layout extends Component {
	state = {
		menu: false,
	};

	toggleMenuHandler = () => {
		this.setState((state) => ({
			menu: !state.menu,
		}));
	};

	menuCloseHandler = () => {
		this.setState({ menu: false });
	};

	render() {
		const { menu } = this.state;

		return (
			<div className={classes.Layout}>
				<Drawer isOpen={menu} onClose={this.menuCloseHandler} />
				<MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} />
				<main>{this.props.children}</main>
			</div>
		);
	}
}
