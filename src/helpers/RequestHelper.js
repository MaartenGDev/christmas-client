class RequestHelper {
  setAuthorization(token = null, authorizationMethod = 'Bearer'){
    this.token = token
    this.authorizationMethod = authorizationMethod;
  }

  postJson (uri, data) {
    return this.jsonRequest('POST', uri, data)
  }

  patchJson (uri, data) {
    return this.jsonRequest('PATCH', uri, data)
  }

  destroyJson (uri, data = {}) {
    return this.jsonRequest('DELETE', uri, data)
  }

  getJson (uri) {
    return fetch(uri, {
      headers: this.getHeaders()
    }).then(res => res.json())
  }

  jsonRequest (method, uri, data) {
    return fetch(uri, {
      method: method,
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  getHeaders () {
    const authorizationHeaders = this.token !== null
      ? { 'Authorization': `${this.authorizationMethod} ${this.token}` }
      : {}

    return {...{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }, ...authorizationHeaders}
  }
}

export default RequestHelper