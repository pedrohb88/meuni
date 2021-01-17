import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SuggestionFieldCollege from "./../SuggestionField/SuggestionFieldCollege";
import colleges from "./../../utils/colleges";

import { setCollege } from "./../../actions/college";

import landinImage from './../../img/landingImage.png';

import "./Landing.css";

const Landing = ({ isAuthenticated, setCollege, history }) => {
	const onCollegeChange = (college) => {
		history.push("/instituicao/" + college);
	};

	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<div className="row">
						<div className="col-7">
							<h1>Universidade é pra você também</h1>
							<p>
								Tire dúvidas diretamente com universitários e encontre
								oportunidades de estudo
							</p>
							<div className="float-left">
                            <SuggestionFieldCollege
								onCollegeChange={onCollegeChange.bind(this)}
								suggestionValues={colleges}
								placeholder="Pesquise uma instituição 🔍"
							/>
                            </div>
						</div>
                        <div className="col-5">
                            <img alt="Imagem de uma estudante" src={landinImage}>
                            </img>
                        </div>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setCollege })(withRouter(Landing));
