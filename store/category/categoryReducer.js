import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_FULFILLED,
    FETCH_CATEGORIES_REJECTED,
    FETCH_CATEGORIES_BY_ID,
    FETCH_CATEGORIES_BY_ID_PENDING,
    FETCH_CATEGORIES_BY_ID_REJECTED,
    POST_ADD,
    POST_ADD_SUCCESS,
    POST_ADD_FAIL,

    POST_CATEGORY,
    POST_CATEGORY_SUCCESS,
    POST_CATEGORY_FAIL,

    POST_BRAND,
    POST_BRAND_SUCCESS,
    POST_BRAND_FAIL,

    POST_MODEL,
    POST_MODEL_SUCCESS,
    POST_MODEL_FAIL,

    POST_PRODUCT,
    POST_PRODUCT_SUCCESS,
    POST_PRODUCT_FAIL,

} from './categoryActions';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    isLoading: false,
    categories: [],
    error: {},
};

const updateCategories = (state, items) => {
    const newCategories = [...items];
    return {
        ...state,
        categories: newCategories,
        isLoading: false,
    };
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case HYDRATE:
            const { category } = action.payload
            return {
                ...state,
                ...category
            };
        case 'SERVER_ACTION':
            console.log("server action in categoryReducer")
        case FETCH_CATEGORIES:
            return {
                ...state,
                isLoading: action.payload,
            };
        case FETCH_CATEGORIES_FULFILLED:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
            };
        case FETCH_CATEGORIES_REJECTED:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case POST_ADD:
            return {
                ...state,
                isLoading: action.payload,
            };
        case POST_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case POST_ADD_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case POST_CATEGORY:
            return {
                ...state,
                isLoading: action.payload,
            };
        case POST_CATEGORY_SUCCESS:
            return updateCategories(state, action.payload);
        case POST_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case POST_BRAND:
            return {
                ...state,
                isLoading: action.payload,
            };
        case POST_BRAND_SUCCESS:
            return updateCategories(state, action.payload);
        case POST_BRAND_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case POST_MODEL:
            return {
                ...state,
                isLoading: action.payload,
            };
        case POST_MODEL_SUCCESS:
            return updateCategories(state, action.payload);
        case POST_MODEL_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case POST_PRODUCT:
            return {
                ...state,
                isLoading: action.payload,
            };
        case POST_PRODUCT_SUCCESS:
            return updateCategories(state, action.payload);
        case POST_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}
