import { types, Instance } from 'mobx-state-tree';

export const Metrics2 = types
	.model({
		date: types.string,
		name: types.string,
		value: types.number
	});


export interface Metrics2 extends Instance<typeof Metrics2> { };