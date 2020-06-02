import React from 'react';
import Header from './Header';
import BreadCrumbs from './BreadCrumbs';
import Filters from './Filters';

const Dashboard: React.FC = () => {
	return (
		<div className="dashboard__container">
			<Header />
			<div className="dashboard__content">
				<BreadCrumbs
					values={[
						{ link: '/dashboard', title: 'Report' },
						{ link: '/dashboard', title: 'Ihre Kampagne auf einen Blick' },
					]}
				/>
				<Filters />
			</div>
		</div>
	)
}

export default Dashboard;