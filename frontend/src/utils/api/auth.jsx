import {APICore} from './APICore'

const api = new APICore()

function register(params) {
    const baseUrl = '/auth/register'
    return api.create(baseUrl, params)
}

function login(params) {
    const baseUrl = '/auth/login/'
    return api.create(baseUrl, params)
}

function logout(params) {
    const baseUrl = '/auth/logout'
    return api.create(`${baseUrl}`, params)
}

function forgotPassword(params) {
    const baseUrl = '/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export {register, login, logout, forgotPassword}