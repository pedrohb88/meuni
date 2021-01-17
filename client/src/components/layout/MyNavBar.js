import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Logo from "./logo_colorido.png";
import { Navbar } from "react-bootstrap";
import blankAvatar from "./../../img/blankAvatar.jpg";

const MyNavBar = ({ auth: { isAuthenticated, loading } }) => {
	const authLinks = (
		<Fragment>
			<Link to="/dashboard">
				<img src={blankAvatar} alt="perfil" className="nav-logo"></img>
			</Link>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link to="/register" className="btn btn-primary">
				Cadastre-se
			</Link>
			<Link to="/login" className="btn btn-secondary">
				Entrar
			</Link>
		</Fragment>
	);


	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				<img src={Logo} alt="Loog" className="nav-logo" />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					
				</ul>
				{!loading && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				)}
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(MyNavBar);
