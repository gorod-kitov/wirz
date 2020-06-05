import { types, Instance } from 'mobx-state-tree';

export const Metrics1 = types
	.model({
		active_length: types.number,
		ad_engagement: types.number,
		clickouts: types.number,
		clicks: types.number,
		page_engagement: types.number,
		sales: types.number,
		total_reach: types.number
	});


export interface IMetrics1 extends Instance<typeof Metrics1> { };