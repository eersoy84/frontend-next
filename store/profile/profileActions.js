// import { FETCH_CATEGORIES, FETCH_CATEGORIES_BY_ID } from './categoryActionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from '../../config';
import { history, authHeader, authHeaderWithSecret } from '../../helpers';

export const EDIT_ADDRESS = 'EDIT_ADDRESS';
export const EDIT_ADDRESS_SUCCESS = 'EDIT_ADDRESS_SUCCESS';
export const EDIT_ADDRESS_FAIL = 'EDIT_ADDRESS_FAIL';

export const FETCH_USER_ADDRESS = 'FETCH_USER_ADDRESS';
export const FETCH_USER_ADDRESS_SUCCESS = 'FETCH_USER_ADDRESS_SUCCESS';
export const FETCH_USER_ADDRESS_FAIL = 'FETCH_USER_ADDRESS_FAIL';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';

export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAIL = 'DELETE_ADDRESS_FAIL';
export const CLEAR_ADDRESS = 'CLEAR_ADDRESS';

function createNewAddress(address, id) {
    return {
        ...address,
        id,
    };
}

export function editAddress(address) {
    return (dispatch) => {
        dispatch(postEditAddress(true));
        const asyncAction = axios.post(`${API_BASE}/routines/setAddress`,
            address,
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            const newAddress = createNewAddress(address, response.data.id);
            dispatch(postEditAddressSuccess(newAddress));
            toast.success('Adresiniz başarıyla güncellendi');
        }).catch((err) => {
            dispatch(postEditAddressFail(err));
            toast.error('Adres güncellenirken hata oluştu');
            toast.error(err.response.data.failed);
        });
        return asyncAction;
    };
}
export const postEditAddress = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: EDIT_ADDRESS,
    payload: bool,
});

export const postEditAddressSuccess = (address) =>
// Return a action type and a loading to false, and the data.
({
    type: EDIT_ADDRESS_SUCCESS,
    payload: address,
});

export const postEditAddressFail = (error) =>
// Return a action type and a payload with a error
({
    type: EDIT_ADDRESS_FAIL,
    payload: error,
});

export function deleteAddress(id) {
    console.log("id", id)
    return (dispatch) => {
        dispatch(postDeleteAddress(true));
        const asyncAction = axios.post(`${API_BASE}/routines/deleteAddress`,
            { id },
            { headers: authHeaderWithSecret() });
        asyncAction.then(response => {
            console.log("response", response.data)
            dispatch(postDeleteAddressSuccess(response.data.id));
            toast.success('Adresiniz başarıyla silindi');
        }).catch((err) => {
            console.log(err.response);
            dispatch(postDeleteAddressFail(err));
            toast.error('Adres silinirken hata oluştu');
        });
        return asyncAction;
    };
}
export const postDeleteAddress = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: DELETE_ADDRESS,
    payload: bool,
});

export const postDeleteAddressSuccess = (id) =>
// Return a action type and a loading to false, and the data.
({
    type: DELETE_ADDRESS_SUCCESS,
    payload: id,
});

export const postDeleteAddressFail = (error) =>
// Return a action type and a payload with a error
({
    type: DELETE_ADDRESS_FAIL,
    payload: error,
});



export function getUserAddress() {
    return (dispatch) => {
        dispatch(fetchUserAddress(true));
        const asyncAction = axios.get(`${API_BASE}/user/address`,
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(fetchUserAddressSuccess(response.data));
        }).catch((err) => {
            dispatch(fetchUserAddressFail(err));
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.failed);
            }
        });
        return asyncAction;
    };
}
export const fetchUserAddress = (bool) => ({
    type: FETCH_USER_ADDRESS,
    payload: bool,
});
export const fetchUserAddressSuccess = (data) => ({
    type: FETCH_USER_ADDRESS_SUCCESS,
    payload: data,
});
export const fetchUserAddressFail = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_USER_ADDRESS_FAIL,
    payload: error,
});

export function clearAddress() {
    return (dispatch) => (
        new Promise((resolve) => {
            dispatch(clearAddressSuccess());
            resolve();
        })
    );
}

export function clearAddressSuccess() {
    return {
        type: CLEAR_ADDRESS,
    };
}