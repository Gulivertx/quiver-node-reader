import fetch from 'cross-fetch'

export const FETCH_NOTEBOOKS_REQUEST = 'FETCH_NOTEBOOKS_REQUEST';
export const FETCH_NOTEBOOKS_SUCCESS = 'FETCH_NOTEBOOKS_SUCCESS';
export const FETCH_NOTEBOOKS_FAILURE = 'FETCH_NOTEBOOKS_FAILURE';

export const requestNotebooks = () => {
    return {
        type: FETCH_NOTEBOOKS_REQUEST
    }
}

export const successNotebooks = (json) => {
    return {
        type: FETCH_NOTEBOOKS_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
}

export const failureNotebooks = (error) => {
    return {
        type: FETCH_NOTEBOOKS_FAILURE,
        error: error,
        receivedAt: Date.now()
    }
}

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
}


export const SELECTNOTEBOOK = 'SELECTNOTEBOOK'

export const changeSelectedNotebook = (event) => {
    console.log('Change selected notebook: ', event.target.value)
    return {
        type: SELECTNOTEBOOK,
        index: event.target.value
    }
}


export const SEARCHNOTEINPUT = 'SEARCHNOTEINPUT'

export const changeSearchNoteInput = (event) => {
    console.log('Change search note input: ', event.target.value)
    let serachTerm = event.target.value.toLowerCase() // Lower case
    serachTerm = serachTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove accents

    return {
        type: SEARCHNOTEINPUT,
        value: serachTerm
    }
}


export const SELECTNOTE = 'SELECTNOTE'

export const changeSelectedNote = (path) => {
    console.log('Change selected note: ', path)
    return {
        type: SELECTNOTE,
        path: encodeURIComponent(path)
    }
}


export const FETCH_NOTE_REQUEST = 'FETCH_NOTE_REQUEST';
export const FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS';
export const FETCH_NOTE_FAILURE = 'FETCH_NOTE_FAILURE';

export const requestNote = () => {
    return {
        type: FETCH_NOTE_REQUEST
    }
}

export const successNote = (json) => {
    return {
        type: FETCH_NOTE_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
}

export const failureNote = (error) => {
    return {
        type: FETCH_NOTE_FAILURE,
        error: error,
        receivedAt: Date.now()
    }
}

export const fetchNote = (path) => {
    return (dispatch, getState) => {
        dispatch(requestNote());

        return fetch(`/quiver/note/${path}`)
            .then(
                response => response.json(),
                error => dispatch(failureNote(error))
            )
            .then(
                json => {
                    dispatch(successNote(json));
                }
            )
    }
}
