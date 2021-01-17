import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyNavBar from "./components/layout/MyNavBar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

//Redux
import { connect } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import Spinner from "./components/layout/Spinner";

import "./App.css";
import "./Custom.css";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App({ authLoading }) {
	//Like componentDidMount
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	if (authLoading) return <Spinner />;

	return (
		<Router>
			<Fragment>
				<MyNavBar />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route component={Routes} />
				</Switch>
			</Fragment>
		</Router>
	);
}

const mapStateToProps = (state) => ({
	authLoading: state.auth.loading,
});

export default connect(mapStateToProps)(App);
