class Api {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	_getResponse(res) {
		if (!res.ok) {
			const msg = res.json().then(res);
			return msg;
		} else {
			return res.json();
		}
	}

	_getToken() {
		return localStorage.getItem('token');
	}

	async _request(url, options) {
		return await fetch(url, options)
			.then(this._getResponse)
			.catch(() => Promise.reject(new Error(`Backend isn't replying`)));
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

	getUserData() {
		return this._request(`${this.url}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
		});
	}

	createGood(data) {
		return this._request(`${this.url}/goods`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
			body: JSON.stringify(data),
		})
	}

	updateGood(data) {
		return this._request(`${this.url}/goods`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
			body: JSON.stringify(data),
		})
	}

	deleteGood(id) {
		return this._request(`${this.url}/goods/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
		})
	}

	getGoods() {
		return this._request(`${this.url}/goods`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
		});
	}

	getUsers() {
		return this._request(`${this.url}/users/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
		});
	}

	updateUser(data, id) {
		return this._request(`${this.url}/users/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
			body: JSON.stringify(data),
		});
	}

	addFavourite(id) {
		return this._request(`${this.url}/users/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
		});
	}

	removeFavourite(id) {
		return this._request(`${this.url}/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${this._getToken()}`,
			},
		});
	}
}

export const api = new Api('http://127.0.0.1:3001');
