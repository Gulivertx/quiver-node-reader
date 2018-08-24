import fetch from 'cross-fetch'

export const FETCH_NOTEBOOKS_REQUEST = 'FETCH_NOTEBOOKS_REQUEST';
export const FETCH_NOTEBOOKS_SUCCESS = 'FETCH_NOTEBOOKS_SUCCESS';
export const FETCH_NOTEBOOKS_FAILURE = 'FETCH_NOTEBOOKS_FAILURE';

export const requestNotebooks = () => {
    return {
        type: FETCH_NOTEBOOKS_REQUEST
    }
};

export const successNotebooks = (json) => {
    return {
        type: FETCH_NOTEBOOKS_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
};

export const failureNotebooks = (error) => {
    return {
        type: FETCH_NOTEBOOKS_FAILURE,
        error: error,
        receivedAt: Date.now()
    }
};

export const fetchNotebooks = () => {
    return (dispatch, getState) => {
        dispatch(requestNotebooks());

        return fetch(`/quiver/notebooks`)
            .then(
                response => response.json(),
                error => dispatch(failureNotebooks(error))
            )
            .then(
                json => {
                    dispatch(successNotebooks(json));
                }
            )
    }
};
