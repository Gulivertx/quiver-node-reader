import fetch from 'cross-fetch'

export const FETCH_NOTEBOOKS_REQUEST = 'FETCH_NOTEBOOKS_REQUEST'
export const FETCH_NOTEBOOKS_SUCCESS = 'FETCH_NOTEBOOKS_SUCCESS'
export const FETCH_NOTEBOOKS_FAILURE = 'FETCH_NOTEBOOKS_FAILURE'

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
                    if (json.status == 'error') return dispatch(failureNote(json.msg))
                    dispatch(successNotebooks(json));
                }
            )
    }
}


export const SELECTNOTEBOOK = 'SELECTNOTEBOOK'

export const changeSelectedNotebook = (index) => {
    console.log('Change selected notebook: ', index)
    return {
        type: SELECTNOTEBOOK,
        index: index
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

export const changeSelectedNote = (uuid) => {
    console.log('Change selected note: ', uuid)
    return {
        type: SELECTNOTE,
        uuid: uuid
    }
}


export const FETCH_NOTE_REQUEST = 'FETCH_NOTE_REQUEST'
export const FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS'
export const FETCH_NOTE_FAILURE = 'FETCH_NOTE_FAILURE'

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
                    if (json.status == 'error') return dispatch(failureNote(json.msg))
                    dispatch(successNote(json));
                }
            )
    }
}


export const FETCH_APPINFO_REQUEST = 'FETCH_APPINFO_REQUEST'
export const FETCH_APPINFO_SUCCESS = 'FETCH_APPINFO_SUCCESS'
export const FETCH_APPINFO_FAILURE = 'FETCH_APPINFO_FAILURE'

export const requestAppInfo = () => {
    return {
        type: FETCH_APPINFO_REQUEST
    }
}

export const successAppInfo = (json) => {
    return {
        type: FETCH_APPINFO_SUCCESS,
        data: json,
        receivedAt: Date.now()
    }
}

export const failureAppInfo = (error) => {
    return {
        type: FETCH_APPINFO_FAILURE,
        error: error,
        receivedAt: Date.now()
    }
}

export const fetchAppInfo = () => {
    return (dispatch, getState) => {
        dispatch(requestAppInfo());

        return fetch(`/app-info`)
            .then(
                response => response.json(),
                error => dispatch(failureAppInfo(error))
            )
            .then(
                json => {
                    if (json.status == 'error') return dispatch(failureAppInfo(json.msg))
                    dispatch(successAppInfo(json));
                }
            )
    }
}


export const SELECTTAG = 'SELECTTAG'

export const changeSelectedTag = (tag) => {
    return {
        type: SELECTTAG,
        tag: tag
    }
}
