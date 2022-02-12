import {
    FETCH_ADS,
    FETCH_ADS_SUCCESS,
    FETCH_ADS_FAIL,
    DISABLE_AD,
    DISABLE_AD_SUCCESS,
    DISABLE_AD_FAIL,
    FETCH_INSTANT_ADS_INFO,
    FETCH_INSTANT_ADS_INFO_SUCCESS,
    FETCH_INSTANT_ADS_INFO_FAIL,

} from './adActions';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    isLoading: false,
    adList: [],
    instantAdsInfo: [],
    error: {},
};

export default function adReducer(state = initialState, action) {
    switch (action.type) {
        case HYDRATE:
            const { ad } = action.payload
            return {
                ...state,
                ...ad
            };
        case FETCH_ADS:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_ADS_SUCCESS:
            let adsSuccess = {
                ...state,
                adList: [...action.payload],
                isLoading: false,
            };
            return adsSuccess
        case FETCH_ADS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case FETCH_INSTANT_ADS_INFO:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_INSTANT_ADS_INFO_SUCCESS:

            return {
                ...state,
                instantAdsInfo: [...action.payload],
                isLoading: false,
            };
        case FETCH_INSTANT_ADS_INFO_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case DISABLE_AD:
            return {
                ...state,
                isLoading: true,
            };
        case DISABLE_AD_SUCCESS:
            return {
                ...state,
                adList: [...action.payload],
                isLoading: false,
            };
        case DISABLE_AD_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
}
