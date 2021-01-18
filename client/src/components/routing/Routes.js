import React from "react";
import { Route, Switch } from 'react-router-dom';

import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';

import College from '../College/College';

import NotFound from '../layout/NotFound';

import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
	return (
		<section className="container">
			<Alert />
			<Switch>
				<Route exact path="/instituicao/:id" component={College} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<Route component={NotFound}></Route>
			</Switch>
		</section>
	);
};

export default Routes;
