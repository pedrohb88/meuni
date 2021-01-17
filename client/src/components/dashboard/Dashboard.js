import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import {logout} from './../../actions/auth';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
    deleteAccount,
    logout
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Meu Perfil</h1>
			<p className="lead">
				<i className="fas fa-user"></i>
				Bem-vindo(a) {user && user.name}
			</p>
			<p>Essa página está em construção</p>
			<a onClick={logout} href="#!">
				<i className="fas fa-sign-out-alt"></i>{" "}
				<span className="hide-sm">Sair</span>
			</a>
			{profile !== null ? (
				<Fragment></Fragment>
			) : (
				<Fragment>
					<p>Você ainda não criou seu perfil!</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Criar Perfil
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(
	Dashboard
);
