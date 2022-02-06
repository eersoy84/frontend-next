import {
    EDIT_ADDRESS,
    EDIT_ADDRESS_SUCCESS,
    EDIT_ADDRESS_FAIL,

    DELETE_ADDRESS,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAIL,

    FETCH_USER_ADDRESS,
    FETCH_USER_ADDRESS_SUCCESS,
    FETCH_USER_ADDRESS_FAIL,
    CLEAR_ADDRESS

} from './profileActions';

const initialState = {
    isLoading: false,
    address: [],
    error: {},
};
const editAddress = (state, item) => {
    const tmp = [...state.address];
    let newAddress = [];
    const index = tmp.findIndex((q) => q.id === item.id);
    if (index === -1) {
        newAddress = [...state.address, item];
    } else {
        tmp[index] = { ...item };
        newAddress = [...tmp];
    }
    return {
        ...state,
        address: newAddress,
        isLoading: false,
    };
};
// const deleteAddress = (state, id) => {
//     const tmp = [...state.address];
//     const index = tmp.findIndex((item) => item.id === id);
//     const newAddress = [
//         ...state.address.slice(0, index),
//         ...state.address.slice(index + 1),
//     ];
//     return {
//         ...state,
//         address: newAddress,
//         isLoading: false,
//     };
// };
const deleteAddress = (state, id) => {
    const tmp = [...state.address]
    const index = tmp.findIndex(item => item.id === id)
    const tmpAddress = tmp[index];
    tmpAddress.hidden = 1;
    return {
        ...state,
        address: tmp,
        isLoading: false
    }
}
const fetchAddress = (state, items) => {
    const newAddress = [...items];
    return {
        ...state,
        address: newAddress,
        isLoading: false,
    };
};
function clearAddress(state) {
    return state = initialState;
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_ADDRESS:
            return {
                ...state,
                isLoading: action.payload,
            };
        case EDIT_ADDRESS_SUCCESS:
            return editAddress(state, action.payload);
        case EDIT_ADDRESS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case DELETE_ADDRESS:
            return {
                ...state,
                isLoading: action.payload,
            };
        case DELETE_ADDRESS_SUCCESS:
            return deleteAddress(state, action.payload);
        case DELETE_ADDRESS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case FETCH_USER_ADDRESS:
            return {
                ...state,
                isLoading: action.payload,
            };
        case FETCH_USER_ADDRESS_SUCCESS:
            return fetchAddress(state, action.payload);
        case FETCH_USER_ADDRESS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case CLEAR_ADDRESS:
            return clearAddress(state);
        default:
            return state;
    }
}
