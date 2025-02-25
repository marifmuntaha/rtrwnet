import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/user'
    return api.get(baseUrl, params)
}

function store(params) {
    const baseUrl = '/user'
    return api.create(baseUrl, params)
}

function show({id}) {
    const baseUrl = `/user/${id}`
    return api.get(baseUrl)
}

function update(params) {
    const baseUrl = `/user/${params.id}`
    return api.update(baseUrl, params)
}

function destroy({id}) {
    const baseUrl = `/user/${id}`
    return api.delete(baseUrl)
}

export {get, store, show, update, destroy}