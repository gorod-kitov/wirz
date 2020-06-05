import AccountStore from './AccountStore';
import CampaignStore from './CampaignStore';
import {
	IAccountStore,
	ICampaignStore
} from './interfaces';

class RootStore {
	account: IAccountStore;
	campaign: ICampaignStore;

	constructor() {
		this.account = AccountStore;
		this.campaign = CampaignStore
	}
}

export default new RootStore();
