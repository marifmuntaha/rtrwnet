import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/member/device'
    return api.get(baseUrl, params)
}

function store(params) {
    const baseUrl = '/member/device'
    return api.create(baseUrl, params)
}

function show({id}) {
    const baseUrl = `/member/device/${id}`
    return api.get(baseUrl)
}

function update(params) {
    const baseUrl = `/member/device/${params.id}`
    return api.update(baseUrl, params)
}

function destroy({id}) {
    const baseUrl = `/member/device/${id}`
    return api.delete(baseUrl)
}

function connect({id, query}) {
    const baseUrl = `/member/device/${id}/connect`
    return api.create(baseUrl, query)
}

export {get, store, show, update, destroy, connect}