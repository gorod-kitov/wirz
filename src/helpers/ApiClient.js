import axios from 'axios';
import { AuthService } from '../services';
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://wirz' : 'http://api.test-server-for-good-guys.online';
export const BASE_API_URL = `${BASE_URL}/api`;

const catchError = (e) => {
	if (e.response) {
		if (e.response.status === 401) {
			AuthService.clearUserTokenAndLogout();
		}
		return {
			status: e.response.status,
			message: (e.response.data && e.response.data.message) ? e.response.data.message : ''
		}
	}
}

export default class ApiClient {
	static getConference = async () => {
		try {
			axios.defaults.headers.common['Authorization'] = `Basic Y29uZmVyZW5jZTpkb2xsOCxqYWNrZXQ=`;
			const res = await axios.get(`${process.env.NODE_ENV === 'development' ? 'https://app.online-maestro.com' : ''}/api/v1/sessions/`);
			return res.data;
		} catch (e) {
			return catchError(e);
		}
	}

	static get = async (url, params = null) => {
		try {
			axios.defaults.headers.common['Authorization'] = `${AuthService.getUserToken()}`;
			const res = await axios.get(`${BASE_API_URL}${url}`, { params: { ...params } });
			return res.data;
		} catch (e) {
			return catchError(e);
		}
	}

	static post = async (url, data, config) => {
		try {
			axios.defaults.headers.common['Authorization'] = `${AuthService.getUserToken()}`;
			const res = await axios.post(`${BASE_API_URL}${url}`, data, config);
			return res.data;
		} catch (e) {
			return catchError(e);
		}
	}

	static patch = async (url, data, config) => {
		try {
			axios.defaults.headers.common['Authorization'] = `${AuthService.getUserToken()}`;
			const res = await axios.patch(`${BASE_API_URL}${url}`, data, config);
			return res.data;
		} catch (e) {
			return catchError(e);
		}
	}


	static put = async (url, data, config) => {
		try {
			axios.defaults.headers.common['Authorization'] = `${AuthService.getUserToken()}`;
			const res = await axios.put(`${BASE_API_URL}${url}`, data, config);
			return res.data;
		} catch (e) {
			return catchError(e);
		}
	}

	static delete = async (url, headers = null, data) => {
		try {
			axios.defaults.headers.common['Authorization'] = `${AuthService.getUserToken()}`;
			const res = await axios.delete(`${BASE_API_URL}${url}`, headers, data);
			return res.data;
		} catch (e) {
			return catchError(e);
		}
	}
}
