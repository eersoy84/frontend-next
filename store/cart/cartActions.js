import { toast } from 'react-toastify';
import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import { API_BASE } from '../../config';
import { history, authHeader, authHeaderWithSecret } from '../../helpers';
import Router from 'next/router';
export const CART_UPDATE = 'CART_UPDATE';
export const CART_UPDATE_SUCCESS = 'CART_UPDATE_SUCCESS';
export const CART_UPDATE_FAIL = 'CART_UPDATE_FAIL';
export const CART_GET = 'CART_GET';
export const CART_GET_SUCCESS = 'CART_GET_SUCCESS';
export const CART_GET_FAIL = 'CART_GET_FAIL';
import { getSession } from "next-auth/react"


export function cartUpdate(cartId, adId, amount) {
    let cartModel = {
        cartId,
        adId,
        amount
    }
    return async (dispatch) => {
        const session = await getSession()
        if (!session) {
            Router.push('/hesap/cikis')
            toast.warning("Ürünü sepete ekleyebilmek için lütfen giriş yapın!")
            return () => (
                new Promise((resolve) => {
                    resolve();
                })
            );
        }
        dispatch(postCartUpdate(true));
        let asyncAction = axios.post(`${API_BASE}/cart/update`,
            cartModel,
            { headers: await authHeaderWithSecret() }
        );
        asyncAction.then((response) => {
            dispatch(postCartUpdateSuccess(response.data));
            toast.success(`Sepet güncellendi`);
        }).catch((err) => {
            console.log(err.response)
            dispatch(postCartUpdateFail(false));
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
        });
        return asyncAction;
    };
}
export const postCartUpdate = (bool) =>
({
    type: CART_UPDATE,
    payload: bool,
});

export const postCartUpdateSuccess = (data) =>
({
    type: CART_UPDATE_SUCCESS,
    payload: data,
});

export const postCartUpdateFail = (error) =>
({
    type: CART_UPDATE_FAIL,
    payload: error,
});

export function cartGet(cartId, isOrder) {
    let cartModel = {
        cartId,
        isOrder
    }
    return async (dispatch) => {
        dispatch(postCartGet(true));
        let asyncAction = axios.post(`${API_BASE}/cart/get`,
            cartModel,
            { headers: await authHeaderWithSecret() })
            .then((response) => {
                dispatch(postCartGetSuccess(response.data));
            }).catch((err) => {
                toast.error(err.response.data.message)
                dispatch(postCartGetFail(err));
            });
        return asyncAction;
    };
}
export const postCartGet = (bool) =>
({
    type: CART_GET,
    payload: bool,
});

export const postCartGetSuccess = (data) =>
({
    type: CART_GET_SUCCESS,
    payload: data,
});

export const postCartGetFail = (error) =>
({
    type: CART_GET_FAIL,
});
