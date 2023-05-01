interface IOptions {
	method: string;
	headers: {
		'Content-Type': string;
	};
  body?: string;
}

class Api {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	_getResponse(res: Response) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		} else {
			// console.log(res);
			return res.json();
		}
	}

	async _request(url: string, options: IOptions) {
		await fetch(url, options).then(this._getResponse);
	}

  signUp(data: object) {
    return this._request(`${this.url}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
  }
}

export const api = new Api('http://127.0.0.1:3001');
