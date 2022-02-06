import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    FOLLOW,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,

    UNFOLLOW,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,

    FETCH_FAVORITES,
    FETCH_FAVORITES_SUCCESS,
    FETCH_FAVORITES_FAIL,
    LOGOUT,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,

    FETCH_INSTITUTIONS,
    FETCH_INSTITUTIONS_SUCCESS,
    FETCH_INSTITUTIONS_FAIL,
    EDIT_PROFILE,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,

} from './userAccountActions';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    user: null,
    favorites: [],
    isLoading: false,
    error: null,
    institutions: [],
};
const updateFavorites = (state, items) => {
    const newFavorites = [...items];
    return {
        ...state,
        favorites: newFavorites,
        isLoading: false,
    };
};
const updateUser = (newUser) => {
    return { ...newUser }
}


export default function userAccountReducer(state = initialState, action) {
    switch (action.type) {
        case HYDRATE:
            console.log("mevcut state", state)
            const { userAccount } = action.payload
            console.log("serverdaki bütün", action.payload)
            console.log("userAccount", userAccount)
            if (userAccount) {
                const { user, favorites } = userAccount
                return {
                    ...state,
                    user: user && Object.keys(user).length != 0 ? { ...user } : null,
                    favorites: favorites && favorites ? [...favorites] : []
                };
            }
        case LOGIN:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: updateUser(action.payload),
            };

        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case EDIT_PROFILE:
            return {
                ...state,
                isLoading: action.payload,
            };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                user: updateUser(action.payload),
                isLoading: false,
            };
        case EDIT_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case REGISTER:
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                user: null,
                favorites: [],
            };

        case FOLLOW:
            return {
                ...state,
                isLoading: true,
            };
        case FOLLOW_SUCCESS:
            return updateFavorites(state, action.payload);
        case FOLLOW_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case UNFOLLOW:
            return {
                ...state,
                isLoading: true,
            };
        case UNFOLLOW_SUCCESS:
            return updateFavorites(state, action.payload);
        case UNFOLLOW_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case FETCH_FAVORITES:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_FAVORITES_SUCCESS:
            return updateFavorites(state, action.payload);
        case FETCH_FAVORITES_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                isLoading: true,
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case FETCH_INSTITUTIONS:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_INSTITUTIONS_SUCCESS:
            return {
                ...state,
                institutions: action.payload,
            };
        case FETCH_INSTITUTIONS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}
