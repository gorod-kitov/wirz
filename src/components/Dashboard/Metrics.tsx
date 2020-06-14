import React from 'react';
import {
	Card, CardContent
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { ICampaignStore } from 'stores/interfaces';

interface Imetric {
	title: string,
	value: string,
	subtitle: string,
	description: string,
	meta: string
}

interface Stores {
	campaign: ICampaignStore
}

const Metrics: React.FC<any> = inject('campaign')(observer(({ campaign }: Stores) => {
	// @ts-ignore
	const Metric: React.FC<{ metric: Imetric }> = ({ metric }) => (
		<Card className="dashboard__metric">
			<CardContent>
				<div className="dashboard__metric__title">{metric.title}</div>
				<div className="dashboard__metric__value">{metric.value.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</div>
				<div className="dashboard__metric__subtitle">{metric.subtitle}</div>
				<div className="dashboard__metric__description">
					<span>{metric.description}</span>
				</div>
				<div className="dashboard__metric__meta">{metric.meta}</div>
			</CardContent>
		</Card>
	)

	return (
		<div className="dashboard__metrics">

			{
				campaign.metrics1?.total_reach !== -1 ?
					<Metric
						metric={{
							title: 'Total Reach',
							value: `${campaign.metrics1?.total_reach || '-'}`,
							subtitle: 'Mio',
							description: 'Bisherige Ausspielung der Werbemittel.',
							meta: 'Click Through Rate 0.20%'
						}}
					/> : null
			}
			{
				campaign.metrics1?.clicks !== -1 ?
					<Metric
						metric={{
							title: "Clicks",
							value: `${campaign.metrics1?.clicks || '-'}`,
							subtitle: 'Completed views',
							description: 'Anzahl User, welche die Videos in den Werbemitteln vollständig angesehen haben.',
							meta: 'Viewrate 1.13%'
						}}
					/> : null
			}
			{
				campaign.metrics1?.ad_engagement !== -1 ?
					<Metric
						metric={{
							title: 'Ad Engagement',
							value: `${campaign.metrics1?.ad_engagement || '-'}`,
							subtitle: 'Unique User',
							description: 'Unique User, welche mindestens 8 Sekunden mit dem Artikel auf der Kampagnenseite interagiert haben.',
							meta: 'Engagement Rate 62.52%'
						}}
					/> : null
			}
			{
				campaign.metrics1?.page_engagement !== -1 ?
					<Metric
						metric={{
							title: 'Page Engagement',
							value: `${campaign.metrics1?.page_engagement || '-'}`,
							subtitle: 'Unique Click-Outs',
							description: 'Anzahl Unique User, welche auf die weiterführende Unternehmensseite geklickt haben.',
							meta: 'Conversion 2.13%'
						}}
					/> : null
			}

			{
				campaign.metrics1?.active_length !== -1 ?
					<Metric
						metric={{
							title: 'Active Length on Site',
							value: `${campaign.metrics1?.active_length || '-'}`,
							subtitle: 'Mal',
							description: 'Bisherige Ausspielung der Werbemittel.',
							meta: 'Click Through Rate 0.20%'
						}}
					/> : null
			}
			{
				campaign.metrics1?.clickouts !== -1 ?
					<Metric
						metric={{
							title: 'Clickouts',
							value: `${campaign.metrics1?.clickouts || '-'}`,
							subtitle: 'Unique User',
							description: 'Unique User, welche mindestens 8 Sekunden mit dem Artikel auf der Kampagnenseite interagiert haben.',
							meta: 'Engagement Rate 62.52%'
						}}
					/> : null
			}
			{
				campaign.metrics1?.sales !== -1 ?
					<Metric
						metric={{
							title: 'Sales',
							value: `${campaign.metrics1?.sales || '-'}`,
							subtitle: 'Unique Click-Outs',
							description: 'Anzahl Unique User, welche auf die weiterführende Unternehmensseite geklickt haben.',
							meta: 'Conversion 2.13%'
						}}
					/> : null
			}
		</div>
	)
}));

export default Metrics;