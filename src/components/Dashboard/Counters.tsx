import React from 'react';
import {
	Card, CardContent
} from '@material-ui/core';
import Map from './Map';

interface ICounter {
	title: string,
	value: string,
	subtitle: string,
	description: string,
	meta: string
}

const Counters: React.FC = () => {
	// @ts-ignore
	const Counter: React.FC<{ counter: ICounter }> = ({ counter }) => (
		<Card className="dashboard__counter">
			<CardContent>
				<div className="dashboard__counter__title">{counter.title}</div>
				<div className="dashboard__counter__value">{counter.value.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</div>
				<div className="dashboard__counter__subtitle">{counter.subtitle}</div>
				<div className="dashboard__counter__description">
					<span>{counter.description}</span>
				</div>
				<div className="dashboard__counter__meta">{counter.meta}</div>
			</CardContent>
		</Card>
	)

	return (
		<div className="dashboard__counters">
			<div className="dashboard__counters__group">
				<Counter
					counter={{
						title: 'TOTALE REICHWEITE',
						value: '4231645',
						subtitle: 'Mal',
						description: 'Bisherige Ausspielung der Werbemittel.',
						meta: 'Click Through Rate 0.20%'
					}}
				/>
				<Counter
					counter={{
						title: 'VOLLSTÄNDIGE ANSICHT',
						value: '128',
						subtitle: 'Completed views',
						description: 'Anzahl User, welche die Videos in den Werbemitteln vollständig angesehen haben.',
						meta: 'Viewrate 1.13%'
					}}
				/>
				<Counter
					counter={{
						title: 'ENGAGIERTE BESUCHER',
						value: '8323',
						subtitle: 'Unique User',
						description: 'Unique User, welche mindestens 8 Sekunden mit dem Artikel auf der Kampagnenseite interagiert haben.',
						meta: 'Engagement Rate 62.52%'
					}}
				/>
				<Counter
					counter={{
						title: 'INTERESSIERTE USER',
						value: '151',
						subtitle: 'Unique Click-Outs',
						description: 'Anzahl Unique User, welche auf die weiterführende Unternehmensseite geklickt haben.',
						meta: 'Conversion 2.13%'
					}}
				/>
			</div>
			<Map />
		</div>
	)
}

export default Counters;