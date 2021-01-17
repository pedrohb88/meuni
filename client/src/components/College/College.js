import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { getCollege, getCollegeInfos, addCollegeInfo } from "./../../actions/college";

import Spinner from "./../layout/Spinner";
import "./College.css";
import avatar from "./../../img/blankAvatar.jpg";

const College = ({
	collegeID,
	info,
	currentInfos,
	getCollege,
	getCollegeInfos,
	addCollegeInfo,
	loading,
	match,
	user,
}) => {
	useEffect(async () => {
		getCollege(match.params.id);

		changeActiveTab("institutional");
	}, [getCollege]);

	const [activeTab, setActiveTab] = useState("institutional");

	const [value, setValue] = useState('');

	const changeActiveTab = (tabName) => {
		getCollegeInfos(match.params.id, tabName);
		setActiveTab(tabName);
	};

	const onChange = (e) => {
		let value = e.target.value;
		setValue(value);
	}

	const onSubmit = (e) => {
		addCollegeInfo(match.params.id, activeTab, value);

		setValue('');
	}

	return !loading && info ? (
		<div className="general-container">
			<div className="row-1">
				<div className="col">
					<p className="uni-sigla">{info.acronym}</p>
					<p className="uni-nome">{info.name}</p>
					<p className="uni-location">
						{info.location.city} - {info.location.state}
					</p>
				</div>
			</div>
			<div className="row row-2">
				<div className="col-4 h-100">
					<div className="category-menu-container">
						<div className="info-category-menu">
							<div
								onClick={() => {
									changeActiveTab("institutional");
								}}
								className={
									activeTab === "institutional"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Instituição</h1>
								<p>Info básica e estrutura do campus</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("enterMethods");
								}}
								className={
									activeTab === "enterMethods"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Formas de Ingresso</h1>
								<p>Informações sobre vestibular e notas de corte</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("costs");
								}}
								className={
									activeTab === "costs"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Custos</h1>
								<p>Custo de vida, mensalidade, etc</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("scholarships");
								}}
								className={
									activeTab === "scholarships"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Bolsas e Auxílios</h1>
								<p>Bolsas, descontos e auxílios oferecidos</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("courses");
								}}
								className={
									activeTab === "courses"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Cursos</h1>
								<p>Cursos oferecidos e qualidade de ensino</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("community");
								}}
								className={
									activeTab === "community"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Comunidade Universitária</h1>
								<p>Grupos, atléticas, eventos, coletivos</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("interestingPlaces");
								}}
								className={
									activeTab === "interestingPlaces"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Locais de interesse</h1>
								<p>Locais próximos como mercados, farmácias, etc</p>
							</div>
							<div
								onClick={() => {
									changeActiveTab("forum");
								}}
								className={
									activeTab === "forum"
										? "info-category-menu-item active"
										: "info-category-menu-item"
								}
							>
								<h1>Fórum</h1>
								<p>Informações gerais</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-8 infos">
					<div className="row myCard">
						<div className="col">
							<div className="row">
								<div className="col">
									<h2>Telefone</h2>
									<p>{info.phone}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<h2>Endereço</h2>
									<p>
										{info.address},{info.district}
									</p>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="row">
								<div className="col">
									<h2>Site</h2>
									<p>{info.website}</p>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<h2>Rede</h2>
									<p>{info.collegeType}</p>
								</div>
							</div>
						</div>
					</div>
					{ user && user.role === 'moderator' && 
					<div class="infoCard addInfoInput">
						<input onChange={(e) => onChange(e)} type="text" value={value} placeholder="Compartilhe seu conhecimento!"></input>
						<button onClick={(e) => {onSubmit(e)}} type="submit"class="btn btn-primary">Enviar</button>
					</div>
					}
					<div className="row info-list">
						{currentInfos &&
							currentInfos.map((currentInfo) => (
								<Fragment key={currentInfo._id}>
									<div className="infoCard">
										<div className="col">
											<div className="row d-flex justify-content-between mb-3">
												<div className="col-8">
													<div className="row">
														<div className="col-2">
															<img src={avatar} alt="avatar" />
														</div>
														<div className="col-10">
															<p className="bold">{currentInfo.user.name}</p>
															<p>Estudante na Universidade Exemplo</p>
														</div>
													</div>
												</div>
												<div className="col-2">
													<div className="row">
														<div className="col-6">
															<div className="row">
																⇧ {currentInfo.upVotes.length}
															</div>
														</div>
														<div className="col-6">
															<div className="row">
																⇩ {currentInfo.downVotes.length}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row">{currentInfo.text}</div>
											<div className="row mt-3">
												<p>Postado em: {currentInfo.date}</p>
											</div>
										</div>
									</div>
								</Fragment>
							))}
					</div>
				</div>
			</div>
		</div>
	) : (
		<Spinner></Spinner>
	);
};

const mapStateToProps = (state) => ({
	collegeID: state.college.college,
	info: state.college.info,
	loading: state.college.loading,
	currentInfos: state.college.currentInfos,
	user: state.auth.user
});

export default connect(mapStateToProps, { getCollege, getCollegeInfos, addCollegeInfo })(
	College
);
