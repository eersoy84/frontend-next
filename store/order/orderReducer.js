import {
    PLACE_ORDER,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,

    FETCH_ORDERS,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,

    ORDER_COUNT,
    ORDER_COUNT_SUCCESS,
    ORDER_COUNT_FAIL,

    ORDER_COUNT_BY_AD_ID,
    ORDER_COUNT_BY_AD_ID_SUCCESS,
    ORDER_COUNT_BY_AD_ID_FAIL,

    CLEAR_ORDERS,

} from './orderActions';

const initialState = {
    isLoading: false,
    orders: [],
    // numOfOrders: [],
    // numOfOrdersByProductId: {},
    error: {},
};

const updateOrders = (state, items) => {
    return {
        ...state,
        orders: [...items],
        isLoading: false,
    };
};
const updateNumOfOrders = (state, NumOfOrders) => {
    const newNumOfOrders = [...NumOfOrders];
    return {
        ...state,
        numOfOrders: newNumOfOrders,
        isLoading: false,
    };
};
function clearOrders(state) {
    return state = initialState;
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                isLoading: action.payload,
            };
        case PLACE_ORDER_SUCCESS:
            return updateOrders(state, action.payload);
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case FETCH_ORDERS:
            return {
                ...state,
                isLoading: action.payload,
            };
        case FETCH_ORDERS_SUCCESS:
            return updateOrders(state, action.payload);
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case ORDER_COUNT:
            return {
                ...state,
                isLoading: true,
            };
        case ORDER_COUNT_SUCCESS:
            return updateNumOfOrders(state, action.payload);
        case ORDER_COUNT_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case ORDER_COUNT_BY_AD_ID:
            return {
                ...state,
                isLoading: true,
            };
        case ORDER_COUNT_BY_AD_ID_SUCCESS:
            return {
                ...state,
                numOfOrdersByProductId: action.payload,
                isLoading: false,
            };
        case ORDER_COUNT_BY_AD_ID_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case CLEAR_ORDERS:
            return clearOrders(state);
        default:
            return state;
    }
}
