import ApiClient from 'helpers/ApiClient';
import { CookieService } from './CookieService';
import history from 'stores/history';

interface IAuthData {
	email: string,
	password: string
}

export const AuthService = {
	login: (data: IAuthData) => {
		return ApiClient.post('/login', data);
	},
	signup: (data: IAuthData) => {
		return ApiClient.post('/signup', data);
	},
	setUserToken: (token: string) => {
		CookieService.set('accessToken', token);
	},
	clearUserTokenAndLogout: () => {
		CookieService.delete('accessToken');
		history.push('/login');
	},
	getUserToken: () => {
		return CookieService.get('accessToken');
	},
}  