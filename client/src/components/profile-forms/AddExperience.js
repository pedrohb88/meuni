import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { addExperience } from "../../actions/profile";

function AddExperience({ addExperience, history }) {
	const [formData, setFormData] = useState({
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1 className="large text-primary">
				Adicione uma Experiência de Trabalho
			</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> 
                Adicione qualquer experiência de trabalho como desenvolvedor/programador
			</p>
			<small>* = Campos obrigatório</small>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addExperience(formData, history);
				}}
				className="form"
			>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Título"
						name="title"
						required
						value={title}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Empresa"
						name="company"
						required
						value={company}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Local"
						name="location"
						value={location}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<h4>Data de Início</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>{" "}
						Emprego Atual
					</p>
				</div>
				<div className="form-group">
					<h4>Data final</h4>
					<input
						type="date"
						name="to"
						value={to}
						onChange={(e) => onChange(e)}
						disabled={toDateDisabled ? "disabled" : ""}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Descrição do Emprego"
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Voltar
				</Link>
			</form>
		</Fragment>
	);
}

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
