export class HttpService {

  _handleErrors(res) {
    if (res.ok) return res;

    throw new Error(res.statusText);
  }

  get(url) {
    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());
  }

  post(url, object) {
    return fetch(url, {
      headers: { 'content-type': 'application/json' },
      method: 'post',
      body: JSON.stringify(object)
    })
      .then(res => this._handleErrors(res));
  }
}