/** Import from actions here **/
import {
    FETCH_NOTE_FAILURE,
    FETCH_NOTE_REQUEST, FETCH_NOTE_SUCCESS,
    FETCH_NOTEBOOKS_FAILURE,
    FETCH_NOTEBOOKS_REQUEST,
    FETCH_NOTEBOOKS_SUCCESS,
    SEARCHNOTEINPUT, SELECTNOTE,
    SELECTNOTEBOOK
} from "../actions";

const defaultState = {
    isFetchingNotebooks: true,
    notebooks: [],
    selectedNotebook: '0',
    searchNoteInput: '',
    selectedNote: '',
    isFetchingNote: false,
    note: {}
}

const main = (state = defaultState, action) => {
    let stateValue = {};

    switch (action.type) {
        case FETCH_NOTEBOOKS_REQUEST:
            stateValue.isFetchingNotebooks = true;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_NOTEBOOKS_SUCCESS:
            stateValue.isFetchingNotebooks = false;
            stateValue.notebooks = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_NOTEBOOKS_FAILURE:
            stateValue.isFetchingNotebooks = false;
            state = Object.assign({}, state, stateValue);
            break;

        case SELECTNOTEBOOK:
            stateValue.selectedNotebook = action.index;
            state = Object.assign({}, state, stateValue);
            break;

        case SEARCHNOTEINPUT:
            stateValue.searchNoteInput = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case SELECTNOTE:
            stateValue.selectedNote = action.path;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_NOTE_REQUEST:
            stateValue.isFetchingNote = true;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_NOTE_SUCCESS:
            stateValue.isFetchingNote = false;
            stateValue.note = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_NOTE_FAILURE:
            stateValue.isFetchingNote = false;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
}

export default main
