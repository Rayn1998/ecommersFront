class Api {
	constructor(url) {
		this.url = url;
	}

	_getResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		} else {
			return res.json();
		}
	}

	async _request(url, options) {
		return await fetch(url, options).then(this._getResponse);
	}

	signUp(data) {
		return this._request(`${this.url}/sign-up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}

	signIn(data) {
		return this._request(`${this.url}/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
}

export const api = new Api('http://127.0.0.1:3001');
