import $ from 'jquery';
import { placemarkAPI } from '../API/placemarkAPI';
import { userAPI } from "../API/userAPI";

const LOGIN = "LOGIN";
const EXIT = "EXIT";
const SET_POSITION = "SET_POSITION";
const GET_PLACEMARKS = "GET_PLACEMARKS";

const mapReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOGIN:
            newState.user = { ...state.user };

            newState.user.isLogged = true;

            return newState;

        case SET_POSITION:
            newState.location = { ...state.location };
            newState.user = { ...state.user };

            newState.location.latitude = action.latitude;
            newState.location.longitude = action.longitude;
            newState.user.move = newState.user.move ? false : true;

            return newState;

        case EXIT:
            document.location.replace('./')

            return newState;

        case GET_PLACEMARKS:
            newState.placemarks = action.placemarks;

            return newState;

        default:
            return newState;
    }
}

const initialState = {
    placemarks: [],
    location: {
        latitude: 55.751999,
        longitude: 37.617734
    },
    user: {
        isLogged: false,
        move: false
    }
}

export default mapReducer;

export function registerRequestThunk(login, password) {
    return (dispatch) => {
        userAPI.register(login, password)
            .then(data => {
                if (data.isOk) {
                    dispatch(loginRequestThunk(login, password));
                }
                else {
                    $('.error').html('Данный логин уже занят.');
                    $('.error').removeClass('d-none');
                }
            });
    }
}

export function loginRequestThunk(login, password) {
    return (dispatch) => {
        userAPI.login(login, password)
            .then(data => {
                if (data.isOk) {
                    setTokenInStorage(data.token);
                    dispatch(loginAC());
                    dispatch(getPlacemarksRequestThunk());

                    $('#success').removeClass('d-none');
                    $('#form').addClass('d-none')
                }
                else {
                    $('.error').html('Введён неправильный логин или пароль.');
                    $('.error').removeClass('d-none');
                }
            })
    }
}

export function logoutRequestThunk() {
    return (dispatch) => {
        userAPI.logout()
            .then(dispatch(exitAC()));
    }
}

export function addPlacemarkRequestThunk(name, latitude, longitude) {
    $('#loading').removeClass('d-none');
    return (dispatch) => {
        if (isTokenExpired()) {
            userAPI.refreshToken()
                .then(placemarkAPI.addPlacemark(name, latitude, longitude)
                    .then(dispatch(getPlacemarksRequestThunk())));
        }
        else placemarkAPI.addPlacemark(name, latitude, longitude)
            .then(dispatch(getPlacemarksRequestThunk()));
    }
}

export function deletePlacemarkRequestThunk(id) {
    $('#loading').removeClass('d-none');
    return (dispatch) => {
        if (isTokenExpired()) {
            userAPI.refreshToken()
                .then(placemarkAPI.deletePlacemark(id)
                    .then(dispatch(getPlacemarksRequestThunk())));
        }
        else placemarkAPI.deletePlacemark(id)
            .then(dispatch(getPlacemarksRequestThunk()));
    }
}

export function updatePlacemarkRequestThunk(id, name, latitude, longitude) {
    $('#loading').removeClass('d-none');
    return (dispatch) => {
        if (isTokenExpired()) {
            userAPI.refreshToken()
                .then(placemarkAPI.updatePlacemark(id, name, latitude, longitude)
                    .then(dispatch(getPlacemarksRequestThunk())));
        }
        else placemarkAPI.updatePlacemark(id, name, latitude, longitude)
            .then(dispatch(getPlacemarksRequestThunk()));
    }
}

function getPlacemarksRequestThunk() {
    return (dispatch) => {
        placemarkAPI.getPlacemarks()
            .then(data => {
                dispatch(getPlacemarksAC(data.placemarks))
            });
    }
}

export function setPosition(data) {
    return (dispatch) => {
        dispatch(setPositionAC(data.coords.latitude, data.coords.longitude));
    }
}

export function setPositionAC(latitude, longitude) {
    return {
        type: SET_POSITION,
        latitude: latitude,
        longitude: longitude
    }
}

function exitAC() {
    return {
        type: EXIT
    }
}

function loginAC() {
    return {
        type: LOGIN
    }
}

function getPlacemarksAC(data) {
    return {
        type: GET_PLACEMARKS,
        placemarks: data
    }
}

function isTokenExpired() {
    if (Date.now() > parseInt(localStorage.getItem('tokenExp'))) {
        return true;
    }
    else return false;
}

export function setTokenInStorage(token) {
    localStorage.setItem('token', token.access_token);
    localStorage.setItem('tokenExp', token.expires_in * 1000 + Date.now());
}