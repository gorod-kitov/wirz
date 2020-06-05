import { types, Instance } from 'mobx-state-tree';

export const Campaign = types
	.model({
		id: types.number,
		user_id: types.number,
		name: types.string
	});


export interface ICampaign extends Instance<typeof Campaign> { };