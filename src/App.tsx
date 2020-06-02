import React from 'react';
import './sass/index.scss';
import { ThemeProvider } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { theme } from './muitheme';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard/Dashboard';

const App: React.FC = () => {
	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route path="/dashboard" component={Dashboard} />
				</Switch>
			</ThemeProvider>
		</div>
	);
}

export default App;
