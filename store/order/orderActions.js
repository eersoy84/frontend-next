// import { FETCH_CATEGORIES, FETCH_CATEGORIES_BY_ID } from './categoryActionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from '../../config';
import { history, authHeader, authHeaderWithSecret } from '../../helpers';
import { cartUpdate } from '../cart/cartActions';

export const PLACE_ORDER = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAIL = 'PLACE_ORDER_FAIL';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

export const ORDER_COUNT = 'ORDER_COUNT';
export const ORDER_COUNT_SUCCESS = 'ORDER_COUNT_SUCCESS';
export const ORDER_COUNT_FAIL = 'ORDER_COUNT_FAIL';

export const ORDER_COUNT_BY_AD_ID = 'ORDER_COUNT_BY_AD_ID';
export const ORDER_COUNT_BY_AD_ID_SUCCESS = 'ORDER_COUNT_BY_AD_ID_SUCCESS';
export const ORDER_COUNT_BY_AD_ID_FAIL = 'ORDER_COUNT_BY_AD_ID_FAIL';

export const CLEAR_ORDERS = 'CLEAR_ORDERS';

export function placeOrder(orderId) {
    let orderModel = { orderId }
    return (dispatch) => {
        dispatch(postPlaceOrder(true));
        const asyncAction = axios.post(`${API_BASE}/cart/get`,
            orderModel,
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(postPlaceOrderSuccess(response.data));
            toast.success('Siparişiniz Başarıyla Teslim Alınmıştır!');
        }).catch((err) => {
            dispatch(postPlaceOrderFail(err));
            if (err?.response) {
                toast.error(err.response.data);
            }
        });
        return asyncAction;
    };
}


export const postPlaceOrder = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: PLACE_ORDER,
    payload: bool,
});

export const postPlaceOrderSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: PLACE_ORDER_SUCCESS,
    payload: data,
});

export const postPlaceOrderFail = (error) =>
// Return a action type and a payload with a error
({
    type: PLACE_ORDER_FAIL,
    payload: error,
});

//* ************************* */

export function getUserOrders() {
    return (dispatch) => {
        dispatch(fetchOrders(true));
        const asyncAction = axios.get(`${API_BASE}/cart/list`,
        { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(fetchOrdersSuccess(response.data));
        }).catch((err) => {
            dispatch(fetchOrdersFail(err));
            toast.error(err.response.data.message);
        });
        return asyncAction;
    };
}
export const fetchOrders = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: FETCH_ORDERS,
    payload: bool,
});

export const fetchOrdersSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: FETCH_ORDERS_SUCCESS,
    payload: data,
});

export const fetchOrdersFail = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_ORDERS_FAIL,
    payload: error,
});

export function clearOrders() {
    return (dispatch) => (
        new Promise((resolve) => {
            dispatch(clearOrdersSuccess());
            resolve();
        })
    );
}

export function clearOrdersSuccess() {
    return {
        type: CLEAR_ORDERS,
    };
}

export function fetchOrderCount() {
    return (dispatch) => {
        dispatch(orderCount(true));
        const asyncAction = axios.get(`${API_BASE}/order-count`);
        asyncAction.then((response) => {
            dispatch(orderCountSuccess(response.data));
        }).catch((err) => {
            dispatch(orderCountFail(err.response.data));
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.message);
            }
        });
        return asyncAction;
    };
}

export const orderCount = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: ORDER_COUNT,
    payload: bool,
});

export const orderCountSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: ORDER_COUNT_SUCCESS,
    payload: data.Result,
});

export const orderCountFail = (error) =>
// Return a action type and a payload with a error
({
    type: ORDER_COUNT_FAIL,
    payload: error,
});

export function fetchOrderCountByAdId(adId) {
    return (dispatch) => {
        dispatch(orderCountByAdId(true));
        const asyncAction = axios.get(`${API_BASE}/order-count?adId=${adId}`);
        asyncAction.then((response) => {
            dispatch(orderCountByAdIdSuccess(response.data));
        }).catch((err) => {
            dispatch(orderCountByAdIdFail(err));
            toast.error(err.response.data.error.message);
        });
        return asyncAction;
    };
}
export const orderCountByAdId = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: ORDER_COUNT_BY_AD_ID,
    payload: bool,
});

export const orderCountByAdIdSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: ORDER_COUNT_BY_AD_ID_SUCCESS,
    payload: data.Result,
});

export const orderCountByAdIdFail = (error) =>
// Return a action type and a payload with a error
({
    type: ORDER_COUNT_BY_AD_ID_FAIL,
    payload: error,
});
