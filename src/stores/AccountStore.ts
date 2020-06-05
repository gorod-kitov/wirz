import { types, flow } from 'mobx-state-tree';
import { User } from './models/User';
import { AccountService } from 'services';

const AccountStore = types
	.model({
		data: types.maybeNull(User)
	})
	.actions((self) => ({
		loadData: flow(function* () {
			try {
				self.data = yield AccountService.getAccountData();
			} catch (err) {
				console.error(err);
			}
		})
	}))

export default AccountStore.create();