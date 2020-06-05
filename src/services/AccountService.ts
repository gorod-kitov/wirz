import ApiClient from 'helpers/ApiClient';

interface IAccountData {
	first_name: string | null,
	last_name: string | null,
	registration_completed?: boolean,
	image: string | null,
	region: string | null,
	timezone: string | null
}

export const AccountService = {
	getAccountData: () => {
		return ApiClient.get('/account');
	},
	editAccountData: (data: IAccountData) => {
		return ApiClient.post('/account', data);
	}
}  