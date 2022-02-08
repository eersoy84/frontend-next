// import { FETCH_CATEGORIES, FETCH_CATEGORIES_BY_ID } from './categoryActionTypes';
import axios from 'axios';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { API_BASE } from '../../config';
export const FETCH_ADS = 'FETCH_ADS';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAIL = 'FETCH_ADS_FAIL';

export const FETCH_INSTANT_ADS_INFO = 'FETCH_INSTANT_ADS_INFO';
export const FETCH_INSTANT_ADS_INFO_SUCCESS = 'FETCH_INSTANT_ADS_INFO_SUCCESS';
export const FETCH_INSTANT_ADS_INFO_FAIL = 'FETCH_INSTANT_ADS_INFO_FAIL';

export const DISABLE_AD = 'DISABLE_AD';
export const DISABLE_AD_SUCCESS = 'DISABLE_AD_SUCCESS';
export const DISABLE_AD_FAIL = 'DISABLE_AD_FAIL';


export function getAds() {
    return (dispatch) => {
        dispatch(fetchAds(true));
        const asyncAction = axios.get(`${API_BASE}/routines/ads`);
        // const asyncAction = axios.get('https://cdn.mekatro.tech/bizlealstore/ads.json');
        asyncAction.then((response) => {
            dispatch(fetchAdsSuccess(response?.data));
        }).catch((err) => {
            dispatch(fetchAdsFail(err?.response?.data?.fail));
        });
        return asyncAction;
    };
}

export const fetchAds = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: FETCH_ADS,
    payload: bool,
});

export const fetchAdsSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: FETCH_ADS_SUCCESS,
    payload: data,
    loading: false,
});

export const fetchAdsFail = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_ADS_FAIL,
    payload: error,
    loading: false,
});

export function getInstantAdsInfo() {
    return (dispatch) => {
        dispatch(fetchInstantAdsInfo(true));
        const asyncAction = axios.get(`${API_BASE}/routines/instantadinfo`);
        asyncAction.then((response) => {
            dispatch(fetchInstantAdsInfoSuccess(response.data));
        }).catch((err) => {
            if (err && err.response && err.response.data) dispatch(fetchInstantAdsInfoFail(err.response.data.fail));
        });
        return asyncAction;
    };
}

export const fetchInstantAdsInfo = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: FETCH_INSTANT_ADS_INFO,
    payload: bool,
});

export const fetchInstantAdsInfoSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: FETCH_INSTANT_ADS_INFO_SUCCESS,
    payload: data,
    loading: false,
});

export const fetchInstantAdsInfoFail = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_INSTANT_ADS_INFO_FAIL,
    payload: error,
    loading: false,
});

export function disableAdById(adId) {
    const DisableAdModel = {
        AdId: adId,
    };
    return (dispatch) => {
        dispatch(disableAd(true));
        const asyncAction = axios.post(`${API_BASE}/disable-ad`,
            DisableAdModel);
        asyncAction.then((response) => {
            dispatch(disableAdSuccess(response.data));
            // toast.success("Siparişiniz Başarıyla Teslim Alınmıştır!");
            Router.push('/kategori');
        }).catch((err) => {
            dispatch(disableAdFail(err));
            toast.error(err.response.data.message);
        });
        return asyncAction;
    };
}
export const disableAd = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: DISABLE_AD,
    payload: bool,
});

export const disableAdSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: DISABLE_AD_SUCCESS,
    payload: data.Result,
    loading: false,
});

export const disableAdFail = (error) =>
// Return a action type and a payload with a error
({
    type: DISABLE_AD_FAIL,
    payload: error,
    loading: false,
});
