// import { FETCH_CATEGORIES, FETCH_CATEGORIES_BY_ID } from './categoryActionTypes';
import axios from 'axios';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { API_BASE } from '../../config';
import { history, authHeader, authHeaderContentType } from '../../helpers';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';
export const FETCH_CATEGORIES_REJECTED = 'FETCH_CATEGORIES_REJECTED';

export const FETCH_CATEGORIES_BY_ID = 'FETCH_CATEGORIES_BY_ID';
export const FETCH_CATEGORIES_BY_ID_FULFILLED = 'FETCH_CATEGORIES_BY_ID_FULFILLED';
export const FETCH_CATEGORIES_BY_ID_REJECTED = 'FETCH_CATEGORIES_BY_ID_REJECTED';

export const POST_ADD = 'POST_ADD';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
export const POST_ADD_FAIL = 'POST_ADD_FAIL';

export const POST_CATEGORY = 'POST_CATEGORY';
export const POST_CATEGORY_SUCCESS = 'POST_CATEGORY_SUCCESS';
export const POST_CATEGORY_FAIL = 'POST_CATEGORY_FAIL';

export const POST_BRAND = 'POST_BRAND';
export const POST_BRAND_SUCCESS = 'POST_BRAND_SUCCESS';
export const POST_BRAND_FAIL = 'POST_BRAND_FAIL';

export const POST_MODEL = 'POST_MODEL';
export const POST_MODEL_SUCCESS = 'POST_MODEL_SUCCESS';
export const POST_MODEL_FAIL = 'POST_MODEL_FAIL';

export const POST_PRODUCT = 'POST_PRODUCT';
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS';
export const POST_PRODUCT_FAIL = 'POST_PRODUCT_FAIL';

export function getCategories() {
    return (dispatch) => {
        dispatch(fetchData(true));
        const asyncAction = axios.get(`${API_BASE}/categories`);
        asyncAction.then((response) => {
            let filtered = response.data.filter(item => item.disabled === 0 && item.parentId == null)
            dispatch(fetchDataFulfilled(filtered));
        }).catch((err) => {
            dispatch(fetchDataRejected(err));
        });
        return asyncAction;
    };
}
export const fetchData = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: FETCH_CATEGORIES,
    payload: bool,
});

export const fetchDataFulfilled = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: FETCH_CATEGORIES_FULFILLED,
    payload: data,
    isLoading: false,
});

export const fetchDataRejected = (error) =>
// Return a action type and a payload with a error
({
    type: FETCH_CATEGORIES_REJECTED,
    payload: error,
    isLoading: false,
});

export function getCategoriesById(id) {
    return (dispatch) => {
        dispatch({
            type: FETCH_CATEGORIES_BY_ID,
            payload: axios.get(`${API_BASE}/category/${id}`)
                .then((result) => result.category),
        });
    };
}
export function createAd(ProductFeatureModel) {
    return (dispatch) => {
        dispatch(postAd(true));
        const asyncAction = axios.post(`${API_BASE}/product-features`,
            ProductFeatureModel,
            { headers: authHeader() });
        asyncAction.then((response) => {
            dispatch(postAdSuccess(response.data));
            toast.success('İlan Başarıyla Oluşturulmuştur!');
            Router.push('/kategori');
        }).catch((err) => {
            dispatch(postAdFail(err));
            if (err.response) {
                toast.error(err.response.data.error.message);
            }
        });
        return asyncAction;
    };
}
export const postAd = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: POST_ADD,
    payload: bool,
});

export const postAdSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: POST_ADD_SUCCESS,
    payload: data.success,
});

export const postAdFail = (error) =>
// Return a action type and a payload with a error
({
    type: POST_ADD_FAIL,
    payload: error,
});

export function addCategory(CategoryModel) {
    return (dispatch) => {
        dispatch(postCategory(true));
        const asyncAction = axios.post(`${API_BASE}/categories`,
            CategoryModel,
            { headers: authHeader() });
        asyncAction.then((response) => {
            dispatch(postCategorySuccess(response.data));
            toast.success('Yeni kategori eklendi');
        }).catch((err) => {
            dispatch(postCategoryFail(err));
            if (err.response) {
                toast.error(err.response.data.error.message);
            }
        });
        return asyncAction;
    };
}
export const postCategory = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: POST_CATEGORY,
    payload: bool,
});

export const postCategorySuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: POST_CATEGORY_SUCCESS,
    payload: data.success,
});

export const postCategoryFail = (error) =>
// Return a action type and a payload with a error
({
    type: POST_CATEGORY_FAIL,
    payload: error,
});

export function addBrand(BrandModel) {
    return (dispatch) => {
        dispatch(postBrand(true));
        const asyncAction = axios.post(`${API_BASE}/brands`,
            BrandModel,
            { headers: authHeader() });
        asyncAction.then((response) => {
            dispatch(postBrandSuccess(response.data));
            toast.success('Yeni marka eklendi');
        }).catch((err) => {
            dispatch(postBrandFail(err));
            if (err.response) {
                toast.error(err.response.data.error.message);
            }
        });
        return asyncAction;
    };
}
export const postBrand = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: POST_BRAND,
    payload: bool,
});

export const postBrandSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: POST_BRAND_SUCCESS,
    payload: data.success,
});

export const postBrandFail = (error) =>
// Return a action type and a payload with a error
({
    type: POST_BRAND_FAIL,
    payload: error,
});

export function addModel(ModelModel) {
    return (dispatch) => {
        dispatch(postModel(true));
        const asyncAction = axios.post(`${API_BASE}/models`,
            ModelModel,
            { headers: authHeader() });
        asyncAction.then((response) => {
            dispatch(postModelSuccess(response.data));
            toast.success('Yeni model eklendi');
        }).catch((err) => {
            dispatch(postModelFail(err));
            if (err.response) {
                toast.error(err.response.data.error.message);
            }
        });
        return asyncAction;
    };
}
export const postModel = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: POST_MODEL,
    payload: bool,
});

export const postModelSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: POST_MODEL_SUCCESS,
    payload: data.success,
});

export const postModelFail = (error) =>
// Return a action type and a payload with a error
({
    type: POST_MODEL_FAIL,
    payload: error,
});

export function addProduct(formData) {
    return (dispatch) => {
        dispatch(postProduct(true));
        const asyncAction = axios.post(`${API_BASE}/products`,
            formData,
            { headers: authHeaderContentType() });
        asyncAction.then((response) => {
            dispatch(postProductSuccess(response.data));
            toast.success('Yeni ürün eklendi');
        }).catch((err) => {
            dispatch(postProductFail(err));
            if (err.response) {
                toast.error(err.response.data.error.message);
            }
        });
        return asyncAction;
    };
}
export const postProduct = (bool) =>
// return a action type and a loading state indicating it is getting data.
({
    type: POST_PRODUCT,
    payload: bool,
});

export const postProductSuccess = (data) =>
// Return a action type and a loading to false, and the data.
({
    type: POST_PRODUCT_SUCCESS,
    payload: data.success,
});

export const postProductFail = (error) =>
// Return a action type and a payload with a error
({
    type: POST_PRODUCT_FAIL,
    payload: error,
});
