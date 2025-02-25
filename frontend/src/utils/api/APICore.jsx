import axios from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        let message

        if (error && error.response && error.response.status === 404) {
            message = 'Maaf! data yang anda cari tidak ditemukan'
        } else if (error && error.response && error.response.status === 403) {
            message = 'Anda tidak memiliki akses ke halaman tersebut'
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Nama Pengguna atau sandi salah'
                    break
                case 403:
                    message = 'Anda tidak memiliki akses ke halaman tersebut'
                    break
                case 404:
                    message = 'Maaf! data yang anda cari tidak ditemukan'
                    break
                default: {
                    message = error.response && error.response.data ? error.response.data['message'] : error.message || error
                }
            }
        }
        return Promise.reject(message)
    }
)

class APICore {

    get = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, params)
        } else {
            response = axios.get(`${url}`, params)
        }
        return response
    }

    getFile = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, {responseType: 'blob'})
        } else {
            response = axios.get(`${url}`, {responseType: 'blob'})
        }
        return response
    }

    getMultiple = (urls, params) => {
        const reqs = []
        let queryString = ''
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`))
        }
        return axios.all(reqs)
    }

    create = (url, data) => {
        return axios.post(url, data)
    }

    updatePatch = (url, data) => {
        return axios.patch(url, data)
    }

    update = (url, data) => {
        return axios.put(url, data)
    }

    delete = (url) => {
        return axios.delete(url)
    }

    createWithFile = (url, data) => {
        const formData = new FormData()
        for (const k in data) {
            formData.append(k, data[k])
        }

        const config = {
            headers: {
                ...axios.defaults.headers.common,
                'content-type': 'multipart/form-data',
            },
        }
        return axios.post(url, formData, config)
    }

    updateWithFile = (url, data) => {
        const formData = new FormData()
        for (const k in data) {
            formData.append(k, data[k])
        }

        const config = {
            headers: {
                ...axios.defaults.headers.common,
                'content-type': 'multipart/form-data',
            },
        }
        return axios.put(url, formData, config)
    }

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser()
        if (!user) {
            return false
        }
        const decoded = new Date(user.expired)
        const currentTime = new Date()
        if (decoded < currentTime) {
            console.warn('access token expired')
            return false
        } else {
            return true
        }
    }

    setLoggedInUser = (session) => {
        session
            ? localStorage.setItem('user', JSON.stringify(session))
            : localStorage.removeItem('user')
    }

    getLoggedInUser = () => {
        const user = localStorage.getItem('user')
        return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
    }

    setUserInSession = (modifiedUser) => {
        const userInfo = localStorage.getItem('user')
        if (userInfo) {
            const {token, user} = JSON.parse(userInfo)
            this.setLoggedInUser({token: token, user: user, subscription: modifiedUser})
        }
    }

    setAuthorization = (token) => {
        if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.token
        else delete axios.defaults.headers.common['Authorization']
    }
}

const api = new APICore();
const user = api.getLoggedInUser();
if (user) {
    const {token} = user
    if (token) {
        api.setAuthorization(token)
    }
}

export {APICore}