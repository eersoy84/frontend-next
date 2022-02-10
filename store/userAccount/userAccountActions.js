import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from '../../config';
import {
    authHeader, authHeaderWithSecret, responseChecker, confirmAuthHeaderWithSecret,
} from '../../helpers';
import { postCartGetFail } from '../cart/cartActions';
import Router from 'next/router'
import { clearOrders } from '../order/orderActions';
import { clearAddress } from '../profile/profileActions';
import { getUserAddress } from '../profile/profileActions'

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const FOLLOW = 'FOLLOW';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAIL = 'FOLLOW_FAIL';

export const UNFOLLOW = 'UNFOLLOW';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAIL = 'UNFOLLOW_FAIL';

export const LOGOUT = 'LOGOUT';
export const CLEAR_FOLLOWING_PRODUCTS = 'CLEAR_FOLLOWING_PRODUCTS';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAIL = 'FETCH_FAVORITES_FAIL';

export const FETCH_INSTITUTIONS = 'FETCH_INSTITUTIONS';
export const FETCH_INSTITUTIONS_SUCCESS = 'FETCH_INSTITUTIONS_SUCCESS';
export const FETCH_INSTITUTIONS_FAIL = 'FETCH_INSTITUTIONS_FAIL';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';


export function login({ email, password }) {
    const UserLoginModel = {
        email,
        password,
    };
    return (dispatch) => {
        dispatch(postLogin(true));
        const asyncAction = axios.post(`${API_BASE}/auth/login`, UserLoginModel);
        asyncAction.then((response) => {
            dispatch(postLoginSuccess(response.data));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            Router.push('/', undefined, { shallow: true })
            dispatch(getFavorites())
            dispatch(getUserAddress())
        }).catch((err) => {
            dispatch(postLoginFail(err?.response?.data?.code));
            if (err?.response?.data) {
                toast.error(err.response.data.message);
                return;
            }
            Router.back()
        });
        return asyncAction;
    };
}

export function loginWithFacebook(data) {
    const TokenIdModel = {
        accessToken: data.accessToken,
        userId: data.userID,
    };
    return (dispatch) => {
        dispatch(postLogin(true));
        const asyncAction = axios.post(`${API_BASE}/auth/facebookLogin`, TokenIdModel);
        asyncAction.then((response) => {
            dispatch(postLoginSuccess(response.data));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            Router.push('/');
        }).catch((err) => {
            dispatch(postLoginFail(err.response.data));
            if (err && err.response && err.response.data) {
                toast.error(err.response.data);
                return;
            }
            Router.back();
        });
        return asyncAction;
    };
}
export function loginWithGoogle(code) {
    const TokenIdModel = {
        code,
    };
    return (dispatch) => {
        dispatch(postLogin(true));
        const asyncAction = axios.post(`${API_BASE}/auth/googleLogin`, TokenIdModel);
        asyncAction.then((response) => {
            dispatch(postLoginSuccess(response.data));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            Router.push('/');
        }).catch((err) => {
            dispatch(postLoginFail(err.response.data.failed));
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.failed);
                return;
            }
            Router.back();
        });
        return asyncAction;
    };
}
export function loginWithTelegram(response) {
    const TokenIdModel = {
        response,
    };
    return (dispatch) => {
        dispatch(postLogin(true));
        const asyncAction = axios.post(`${API_BASE}/auth/telegram`, TokenIdModel);
        asyncAction.then((response) => {
            dispatch(postLoginSuccess(response.data));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            Router.push('/');
        }).catch((err) => {
            dispatch(postLoginFail(err.response.data.failed));
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.failed);
                return;
            }
            Router.back();
        });
        return asyncAction;
    };
}
export function changePassword(password) {
    return (dispatch) => {
        dispatch(postChangePassword());
        const asyncAction = axios.post(`${API_BASE}/auth/updatepassword`,
            { password },
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(postChangePasswordSuccess(response.data));
            Router.push('/hesap');
            toast.success('Şifreniz başarıyla değiştirilmiştir');
        }).catch((err) => {
            dispatch(postChangePasswordFail(err));
            Router.push('/hesap/sifre-yenile');
            if (err && err.response && err.response.data) {
                toast.error('Şifre değiştirilirken hata oluştu!');
            }
        });
        return asyncAction;
    };
}

export function forgotPassword(email) {
    const forgotPasswordModel = {
        email,
    };
    return (dispatch) => {
        dispatch(postChangePassword());
        const asyncAction = axios.post(`${API_BASE}/auth/forgotPassword`,
            forgotPasswordModel);
        asyncAction.then((response) => {
            dispatch(postChangePasswordSuccess(response.data));
            Router.push('/hesap/cikis');
            toast.success('Lütfen, size gönderdiğimiz kayıtlı e-posta adresinizden şifrenizi yenileyiniz!');
        }).catch((err) => {
            dispatch(postChangePasswordFail(err));
            Router.push('/hesap/sifre-yenile');
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.message);
            }
        });
        return asyncAction;
    };
}

export function loginConfirm(token, change) {
    return (dispatch) => {
        dispatch(postLogin(true));
        const asyncAction = axios.post(`${API_BASE}/auth/validate`,
            {},
            { headers: confirmAuthHeaderWithSecret(token) });
        asyncAction.then((response) => {
            dispatch(postLoginSuccess(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', JSON.stringify(token));
            if (change) {
                Router.push('/hesap/sifre-yenile');
                toast.info('Lütfen şifrenizi yenileyiniz');
            } else {
                Router.push('/');
                toast.success('Tebrikler, artık bizleal\' maya başlayabilirsiniz!');
            }
        }).catch((err) => {
            dispatch(postLoginFail(err.response.data.failed));
            if (err && err.response && err.response.data) {
                toast.error('Kayıt işlemi sırasında hata oluştu, tekrar üye olmayı deneyiniz!');
                return;
            }
            Router.back();
        });
        return asyncAction;
    };
}

export function deleteUnconfirmedUser() {
    return (dispatch) => {
        dispatch(deleteUser(true));
        const asyncAction = axios.get(`${API_BASE}/delete-user`,
            { headers: authHeader() });
        asyncAction.then((response) => {
            dispatch(deleteUserSuccess(response.data));
            Router.push('/');
        }).catch((err) => dispatch(deleteUserFail(err)));
        return asyncAction;
    };
}

export function getFavorites(token) {
    return (dispatch) => {
        console.log("geldi mi buraya=========>")
        dispatch(fetchFavorites(true));
        const asyncAction = axios.get(`${API_BASE}/routines/favorites`,
            { headers: authHeaderWithSecret(token) }
        );
        asyncAction.then((response) => {
            console.log("response", response?.data)
            dispatch(fetchFavoritesSuccess(response?.data));
        }).catch((err) => dispatch(fetchFavoritesFail(err)));
        return asyncAction;
    };
}

export const postLogin = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: LOGIN,
    payload: bool,
});

export const postLoginSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: LOGIN_SUCCESS,
    payload: data.user,
});

export const postLoginFail = (error) =>
// Return a action type and a payload with a error
({
    type: LOGIN_FAIL,
    payload: error,
});

export const postChangePassword = () =>
// return a action type and a loading state indicating it is getting data.
({
    type: CHANGE_PASSWORD,
});

export const postChangePasswordSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data,
});

export const postChangePasswordFail = (error) =>
// Return a action type and a payload with a error
({
    type: CHANGE_PASSWORD_FAIL,
    payload: error,
});

export const deleteUser = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: LOGIN,
    payload: bool,
});

export const deleteUserSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: LOGIN_SUCCESS,
    payload: data,
});

export const deleteUserFail = (error) =>
// Return a action type and a payload with a error
({
    type: LOGIN_FAIL,
    payload: error.message,
});

export const fetchFavorites = (bool) => ({
    type: FETCH_FAVORITES,
    payload: bool,
});
export const fetchFavoritesSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: FETCH_FAVORITES_SUCCESS,
    payload: data,
});

export const fetchFavoritesFail = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_FAVORITES_FAIL,
    payload: error.message,
});

export function register({
    firstName, lastName, email, password,
}) {
    const userRegistrationModel = {
        firstName,
        lastName,
        email,
        password,
    };
    return (dispatch) => {
        dispatch(postRegister());
        const asyncAction = axios.post(`${API_BASE}/auth/register`,
            userRegistrationModel);
        asyncAction.then((response) => {
            dispatch(postRegisterSuccess());
            toast.info('E-posta adresinize gönderdiğimiz onay linkine tıklayarak,sisteme giriş yapabilirsiniz.');
            Router.push('/hesap/onay');
        }).catch((err) => {
            dispatch(postRegisterFail(err));
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.failed);
                Router.push('/hesap/cikis');
                return;
            }
            if (err) {
                toast.error('Üye olurken hata oluştu!');
            }
        });
        return asyncAction;
    };
}

export const postRegister = () =>
// return a action type and a loading state indicating it is getting data.
({
    type: REGISTER,
});

export const postRegisterSuccess = () =>
// Return a action type and a loading to false, and the data.
({
    type: REGISTER_SUCCESS,
});

export const postRegisterFail = (error) =>
// Return a action type and a payload with a error
({
    type: REGISTER_FAIL,
    payload: error.message,
});

export function logout() {
    return (dispatch) => {
        responseChecker.logout();
        dispatch(logoutNow());
        dispatch(postCartGetFail(false));
        dispatch(clearOrders());
        dispatch(clearAddress());
    };
}

export const logoutNow = () => ({
    type: LOGOUT,
});

export function follow(adId) {
    const ParticipantModel = { adId };
    return (dispatch) => {
        dispatch(postFollow());
        const asyncAction = axios.post(`${API_BASE}/routines/follow`,
            ParticipantModel,
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(postFollowSuccess(response.data));
            toast.success('İlan Takip Ediliyor');
        }).catch((err) => {
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.fail);
                dispatch(postFollowFail(err));
            }
        });
        return asyncAction;
    };
}

export const postFollow = () =>
// return a action type and a loading state indicating it is getting data.
({
    type: FOLLOW,
});

export const postFollowSuccess = (data) => ({
    type: FOLLOW_SUCCESS,
    payload: data,
});
export const postFollowFail = (error) =>
// Return a action type and a payload with a error
({
    type: FOLLOW_FAIL,
    payload: error.message,
});

export const unfollow = (adId) => (dispatch) => {
    const ParticipantModel = { adId };
    return new Promise((resolve, reject) => {
        dispatch(postUnFollow());
        const asyncAction = axios.post(`${API_BASE}/routines/unfollow`,
            ParticipantModel,
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(postUnFollowSuccess(response.data));
            // dispatch(getInstantAdsInfo());
            toast.info('İlanı Takipten Çıktınız');
            resolve();
        }).catch((err) => {
            if (err && err.response && err.response.data) {
                toast.error(err.response.data.fail);
                dispatch(postFollowFail(err));
                reject();
            }
        });
    });
};

export const postUnFollow = () =>
// return a action type and a loading state indicating it is getting data.
({
    type: UNFOLLOW,
});

export const postUnFollowSuccess = (data) =>
// Return a action type and a loading to false, and the data.
// data === true ? toast.success(`Takip Ediliyor`) : toast.info("Takipten Çıktınız")
({
    type: UNFOLLOW_SUCCESS,
    payload: data,
});

export const postUnFollowFail = (error) =>
// Return a action type and a payload with a error
({
    type: UNFOLLOW_FAIL,
    payload: error,
});

export const getInstitutions = () => (dispatch) => new Promise((resolve, reject) => {
    dispatch(fetchInstitutions());
    const asyncAction = axios.get(`${API_BASE}/routines/institutions`,
        { headers: authHeaderWithSecret() });
    asyncAction.then((response) => {
        dispatch(fetchInstitutionsSuccess(response.data));
        resolve();
    }).catch((err) => {
        if (err && err.response && err.response.data) {
            toast.error(err.response.data.fail);
            dispatch(fetchInstitutionsFail(err));
            reject();
        }
    });
});

export const fetchInstitutions = () =>
// return a action type and a loading state indicating it is getting data.
({
    type: FETCH_INSTITUTIONS,
    payload: true,
});

export const fetchInstitutionsSuccess = (data) =>
// Return a action type and a loading to false, and the data.
// data === true ? toast.success(`Takip Ediliyor`) : toast.info("Takipten Çıktınız")
({
    type: FETCH_INSTITUTIONS_SUCCESS,
    payload: data,
});

export const fetchInstitutionsFail = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_INSTITUTIONS_FAIL,
    payload: error,
});

export function editProfile(firstName, lastName) {
    const editProfileModel = {
        firstName,
        lastName,
    };
    return (dispatch) => {
        dispatch(postEditProfile(true));
        const asyncAction = axios.post(`${API_BASE}/user/editProfile`,
            editProfileModel,
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            dispatch(postEditProfileSuccess(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success('Profiliniz başarıyla güncellendi');
            // Router.back();
        }).catch((err) => {
            dispatch(postEditProfileFail(err));
            toast.error(err.response.data.message);
        });
        return asyncAction;
    };
}

export const postEditProfile = (bool) => ({
    type: EDIT_PROFILE,
    payload: bool,
});
export const postEditProfileSuccess = (data) => ({
    type: EDIT_PROFILE_SUCCESS,
    payload: data,
});
export const postEditProfileFail = (error) =>
// Return a action type and a payload with a error
({
    type: EDIT_PROFILE_FAIL,
    payload: error,
});