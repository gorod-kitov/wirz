import { types, Instance } from 'mobx-state-tree';
import { Campaign } from './Campaign';

export const User = types
	.model({
		id: types.number,
		name: types.maybeNull(types.string),
		email: types.string,
		campaigns: types.array(Campaign)
	})

export interface IUser extends Instance<typeof User> { }; 