import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "./../../actions/alert";
import { register } from "./../../actions/auth";

import locations from './../../utils/locations';
import colleges from './../../utils/colleges';

import SuggestionFieldLocation from './../SuggestionField/SuggestionFieldLocation';
import SuggestionFieldCollege from './../SuggestionField/SuggestionFieldCollege';

const Register = ({ setAlert, register, isAuthenticated }) => {

	const [formData, setFormData] = useState({
		name: "",
		email: "",
        cursando: "",
		password: "",
		password2: "",
    });

	const [location, setLocation] = useState({city: '', state: ''});
	
	const [collegeID, setCollegeID] = useState('');
    
	const { name, email, password, password2, cursando } = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
    };
    
    const onLocationChange = (location) => {
        setLocation(location);
    }

    const onCollegeChange = (college) => {
        setCollegeID(college);
    }

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			return setAlert("As senhas não são iguais", "danger");
		}

		register({ name, email, password, location, collegeID });
	};

	//Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/" />;
    }
    
	return (
		<Fragment>
			<h1 className="large text-primary">Cadastro</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Crie sua Conta
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Nome"
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<p>Você está cursando ensino superior no momento?</p>

					<input
						id="cursando-sim"
						type="radio"
						name="cursando"
						value="s"
						onChange={(e) => onChange(e)}
						required
					/>
					<label htmlFor="cursando-sim">Sim</label>
					<br />

					<input
						id="cursando-não"
						type="radio"
						name="cursando"
						value="n"
						onChange={(e) => onChange(e)}
						required
					/>
					<label htmlFor="cursando-não">Não</label>
					<br />
				</div>

				{cursando === "s" ? (

                    <SuggestionFieldCollege onCollegeChange={onCollegeChange.bind(this)} suggestionValues={colleges} placeholder="Em qual instituição de ensino você estuda?"/>

				) : null}
				
				<div className="form-group">
					<SuggestionFieldLocation onLocationChange={onLocationChange.bind(this)} suggestionValues={locations} />
				</div>

				<div className="form-group">
					<input
						type="password"
						placeholder="Senha"
						name="password"
						minLength="6"
						value={password}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirmar Senha"
						name="password2"
						minLength="6"
						value={password2}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Cadastrar" />
			</form>
			<p className="my-1">
				Já tem uma conta? <Link to="/login">Entrar</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
