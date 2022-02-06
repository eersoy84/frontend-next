// import { FETCH_CATEGORIES, FETCH_CATEGORIES_BY_ID } from './categoryActionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from '../../config';
import { history, authHeader, authHeaderContentType } from '../../helpers';

export const FETCH_PROJECT_PHOTOS = 'FETCH_PROJECT_PHOTOS';
export const FETCH_PROJECT_PHOTOS_SUCCESS = 'FETCH_PROJECT_PHOTOS_SUCCESS';
export const FETCH_PROJECT_PHOTOS_FAIL = 'FETCH_PROJECT_PHOTOS_FAIL';

export function fetchProjectPhotos() {
    return (dispatch) => {
        dispatch(fetchProjectPhoto(true));
        const asyncAction = axios.get('https://cdn.mekatro.tech/bizlealstore/project-photos.json');
        asyncAction.then((response) => {
            dispatch(fetchProjectPhotoSuccess(response.data));
        }).catch((err) => {
            dispatch(fetchProjectPhotoFail(err));
        });
        return asyncAction;
    };
}
export const fetchProjectPhoto = (bool) =>
    // return a action type and a loading state indicating it is getting data.
    ({
        type: FETCH_PROJECT_PHOTOS,
        payload: bool,
    });

export const fetchProjectPhotoSuccess = (data) =>
    // Return a action type and a loading to false, and the data.
    ({
        type: FETCH_PROJECT_PHOTOS_SUCCESS,
        payload: data.Result,
        isLoading: false,
    });

export const fetchProjectPhotoFail = (error) =>
    // Return a action type and a payload with a error
    ({
        type: FETCH_PROJECT_PHOTOS_FAIL,
        payload: error,
        isLoading: false,
    });
