import {
    CART_UPDATE,
    CART_UPDATE_SUCCESS,
    CART_UPDATE_FAIL,
    CART_GET,
    CART_GET_SUCCESS,
    CART_GET_FAIL,
} from './cartActions';
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
    isLoading: false,
    info: {},
    taxes: [],
    items: [],
    ratings: []
};

const updateCart = (state, data) => {
    let result = {
        ...state,
        info: { ...data.info },
        taxes: [...data.taxes],
        items: [...data.items],
        ratings: [...data.ratings],
        isLoading: false,
    };
    return result;
};
function clearCart(state) {
    return state = initialState;
}
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case HYDRATE:
            const { cart } = action.payload
            if (cart) {
                return {
                    ...state,
                    info: { ...cart.info },
                    items: [...cart.items],
                    taxes: [...cart.taxes],
                    ratings: [...cart.ratings],
                }
            }
            return initialState
        case CART_GET:
            return {
                ...state,
                isLoading: true,
            };
        case CART_GET_SUCCESS:
            return updateCart(state, action.payload);
        case CART_GET_FAIL:
            return clearCart(state)
        case CART_UPDATE:
            return {
                ...state,
                isLoading: true,
            };
        case CART_UPDATE_SUCCESS:
            return updateCart(state, action.payload);
        case CART_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
