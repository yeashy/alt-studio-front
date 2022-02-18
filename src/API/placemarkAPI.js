import * as axios from 'axios';
import { baseHeaders } from './userAPI';

const baseURL = 'http://backend.ru/api';

const instance = axios.create({
    baseURL: baseURL
});

function addPlacemark(name, latitude, longitude) {
    let headers = { ...baseHeaders };
    headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    let body = {
        name: name,
        latitude: latitude,
        longitude: longitude
    }

    return instance.post('placemark', body, { headers: headers })
        .then(response => {
            return response.data;
        });;
}

function updatePlacemark(id, name, latitude, longitude) {
    let headers = { ...baseHeaders };
    headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    let body = {
        id: id,
        name: name,
        latitude: latitude,
        longitude: longitude
    }

    return instance.post('placemark', body, { headers: headers })
        .then(response => {
            return response.data
        });
}

function getPlacemarks() {
    let headers = { ...baseHeaders };
    headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return instance.get('placemark', { headers: headers })
        .then(response => {
            return response.data;
        });
}

function deletePlacemark(id) {
    let headers = { ...baseHeaders };
    headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return instance.delete(`placemark/${id}`, { headers: headers })
        .then(response => {
            return response.data;
        });;
}

export const placemarkAPI = {
    addPlacemark: addPlacemark,
    getPlacemarks: getPlacemarks,
    deletePlacemark: deletePlacemark,
    updatePlacemark: updatePlacemark
}