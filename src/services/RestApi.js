import RequestHelper from '../helpers/RequestHelper'

class RestApi {
  constructor (endpoint, resource) {
    this.endpoint = endpoint;
    this.resource = resource;
    this.requestHelper = new RequestHelper();
  }

  setAuthorization(token){
    this.requestHelper.setAuthorization(token);
  }

  all () {
    return new Promise((res, rej) => {
      this.requestHelper.getJson(`${this.endpoint}/${this.resource}`)
        .then(response => {
          localStorage.setItem(`api_cache_${this.resource}`, JSON.stringify(response.data))
          res(response.data)
        })
        .catch(x => res(JSON.parse(localStorage.getItem(`api_cache_${this.resource}`))))
    })
  }

  createOrUpdate (resource) {
    if (resource.id === undefined) return this.store(resource)

    return this.update(resource)
  }

  store (resource) {
    return new Promise((res, rej) => {
      this.requestHelper.postJson(`${this.endpoint}/${this.resource}`, resource)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  update (resource) {
    return new Promise((res, rej) => {
      this.requestHelper.patchJson(`${this.endpoint}/${this.resource}/${resource.id}`, resource)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }

  destroy (resource) {
    return new Promise((res, rej) => {
      this.requestHelper.destroyJson(`${this.endpoint}/${this.resource}/${resource.id}`)
        .then(response => res(response.data))
        .catch(err => rej(err))
    })
  }
}

export default RestApi