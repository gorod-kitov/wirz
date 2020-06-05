export const CookieService = {
	get: (name: string) => {
		if (typeof document !== 'undefined') {
			const cookieData = document.cookie.replace(' ', '').split(';');
			let res: null | string = null;
			for (let i = 0; i < cookieData.length; i++) {
				let keyValue = cookieData[i].toString().replace(' ', '').split('=');
				if (keyValue[0] === name) {
					res = keyValue[1];
					break;
				}
			}
			return res;
		}
		return null;
	},
	set: (name: string, value: string) => {
		if (typeof document !== 'undefined') {
			document.cookie = `${name}=${value}; path=/ `;
		}
	},
	delete: (name: string) => {
		document.cookie = `${name}= ;E xpires=Thu, 01 Jan 1970 00:00:01 GMT; max-age=-1; path=/;`;
	}
}  