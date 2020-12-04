import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
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
				<Drawer
					isOpen={menu}
					onClose={this.menuCloseHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>
				<MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} />
				<main>{this.props.children}</main>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.token,
});

// const mapDispatchToProps = {};

export default connect(mapStateToProps)(Layout);
