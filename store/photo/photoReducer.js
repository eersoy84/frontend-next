import {
    FETCH_PROJECT_PHOTOS,
    FETCH_PROJECT_PHOTOS_SUCCESS,
    FETCH_PROJECT_PHOTOS_FAIL,

} from './photoActions';

const initialState = {
    isLoading: false,
    projectPhotos: [],
    error: {},
};
const updateProjectPhotos = (state, projectPhotos) => ({
    ...state,
    projectPhotos,
    isLoading: false,
});

export default function photoReducer(state = initialState, action) {
    switch (action.type) {
    case FETCH_PROJECT_PHOTOS:
        return {
            ...state,
            isLoading: action.payload,
        };
    case FETCH_PROJECT_PHOTOS_SUCCESS:
        return updateProjectPhotos(state, action.payload);
    case FETCH_PROJECT_PHOTOS_FAIL:
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    default:
        return state;
    }
}
