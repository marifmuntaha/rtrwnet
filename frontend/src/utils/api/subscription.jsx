import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/subscribe'
    return api.get(baseUrl, params)
}

function store(params) {
    const baseUrl = '/subscribe'
    return api.create(baseUrl, params)
}

function show(id) {
    const baseUrl = `/subscribe/${id}`
    return api.get(baseUrl)
}

function update(params) {
    const baseUrl = `/subscription/${params.id}`
    return api.update(baseUrl, params)
}

function destroy({id}) {
    const baseUrl = `/subscription/${id}`
    return api.delete(baseUrl)
}

export {get, store, show, update, destroy}