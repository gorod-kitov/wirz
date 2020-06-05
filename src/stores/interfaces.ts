import { Instance } from 'mobx-state-tree';
import AccountStore from './AccountStore';
import CampaignStore from './CampaignStore';

export interface IAccountStore extends Instance<typeof AccountStore> { };
export interface ICampaignStore extends Instance<typeof CampaignStore> { };