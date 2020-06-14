import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { IAccountStore } from 'stores/interfaces';
import 'react-nice-dates/build/style.css';
import Header from './Header';
import BreadCrumbs from './BreadCrumbs';
import Metrics from './Metrics';
import Filters from './Filters';
import Perfomance from './Perfomance';
import MetricsForm from './MetricsForm';
import BasicMetricsForm from './BasicMetricsForm';

interface Stores {
	account: IAccountStore
}

const Dashboard: React.FC<any> = inject('account')(observer(({ account }: Stores) => {

	useEffect(() => {
		account.loadData();
	}, [account]);

	return (
		<div className="dashboard__container">
			<Header userName={account.data?.name || ''} />
			<div className="dashboard__content">
				<BreadCrumbs
					values={[
						{ link: '/dashboard', title: 'Report' },
						{ link: '/dashboard', title: 'Ihre Kampagne auf einen Blick' },
					]}
				/>
				<Filters campaignList={account.data?.campaigns} />
				{account.data ? <Metrics /> : null}
				<Perfomance />
				{
					account.data?.id === 1 ?
						<>
							<MetricsForm campaignList={account.data?.campaigns} />
							<BasicMetricsForm campaignList={account.data?.campaigns} />
						</> : null
				}
			</div>
		</div>
	)
}));

export default Dashboard; 