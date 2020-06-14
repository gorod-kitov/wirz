import { types, Instance } from 'mobx-state-tree';

export const Metrics1 = types
	.model({
		active_length: types.number,
		active_length_is_active: types.number,
		ad_engagement: types.number,
		ad_engagement_is_active: types.number,
		clickouts: types.number,
		clickouts_is_active: types.number,
		clicks: types.number,
		clicks_is_active: types.number,
		page_engagement: types.number,
		page_engagement_is_active: types.number,
		sales: types.number,
		sales_is_active: types.number,
		total_reach: types.number,
		total_reach_is_active: types.number
	});


export interface IMetrics1 extends Instance<typeof Metrics1> { };