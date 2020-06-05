import React from 'react';
import './sass/index.scss';
import { ThemeProvider } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { theme } from './muitheme';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard/Dashboard';
import { AuthService } from 'services';

const App: React.FC = () => {
	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<Switch>
					<Route exact path="/" render={() => AuthService.getUserToken() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />} />
					<Route exact path="/login" render={() => AuthService.getUserToken() ? <Redirect to="/dashboard" /> : <Login />} />
					<Route path="/dashboard" render={() => AuthService.getUserToken() ? <Dashboard /> : <Redirect to="/login" />} />
				</Switch>
			</ThemeProvider>
		</div>
	);
}

export default App; 
