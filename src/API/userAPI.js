import * as axios from 'axios';
import { setTokenInStorage } from '../store/mapReducer';

const baseURL = 'http://backend.ru/api/auth';

const instance = axios.create({
    baseURL: baseURL
});

export const baseHeaders = {
    'Content-type': 'application/json',
    'Accept': 'application/json'
}

function register(login, password) {
    let body = {
        login: login,
        password: password
    };
    return instance.post('register', body, { headers: baseHeaders })
        .then(response => {
            return {
                token: response.data,
                isOk: true
            };
        })
        .catch(error => {
            return {
                message: error,
                isOk: false
            }
        })

}

function login(login, password) {
    let body = {
        login: login,
        password: password
    };
    return instance.post('login', body, { headers: baseHeaders })
        .then(response => {
            return {
                token: response.data,
                isOk: true
            }
        })
        .catch(error => {
            return {
                message: error,
                isOk: false
            }
        })
}

function refreshToken() {
    let headers = { ...baseHeaders };
    headers.Authorization = 'Bearer ' + localStorage.getItem('token');

    return instance.post('refresh', {}, { headers: headers })
        .then(response => {
            setTokenInStorage(response.data);
        })
}

function logout() {
    let headers = { ...baseHeaders };
    headers.Authorization = 'Bearer ' + localStorage.getItem('token');

    return instance.post('logout', {}, { headers: headers })
}

export const userAPI = {
    register: register,
    login: login,
    refreshToken: refreshToken,
    logout: logout
}