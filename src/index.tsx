import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import history from './stores/history';
import RootStore from './stores/RootStore';

export const routingStore = new RouterStore();
const uHistory = syncHistoryWithStore(history, routingStore);

const stores = {
	routingStore: routingStore,
	RootStore: RootStore,
	account: RootStore.account,
	campaign: RootStore.campaign
}

ReactDOM.render(
	<Provider {...stores}>
		<Router history={uHistory}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.register();
