/** Import from actions here **/
import {
    FETCH_APPINFO_FAILURE, FETCH_APPINFO_REQUEST, FETCH_APPINFO_SUCCESS,
    FETCH_NOTE_FAILURE,
    FETCH_NOTE_REQUEST, FETCH_NOTE_SUCCESS,
    FETCH_NOTEBOOKS_FAILURE,
    FETCH_NOTEBOOKS_REQUEST,
    FETCH_NOTEBOOKS_SUCCESS,
    SEARCHNOTEINPUT, SELECTNOTE,
    SELECTNOTEBOOK, SELECTTAG
} from "../actions";

const defaultState = {
    isFetchingNotebooks: true,
    notebooks: [],
    selectedNotebook: 0,
    searchNoteInput: '',
    selectedNote: '',
    isFetchingNote: false,
    note: {
        title: '',
        tags: [],
        created_at: 0,
        updated_at: 0,
        cells: []
    },
    isFetchingAppInfo: true,
    appInfo: {},
    selectedTag: ''
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
            stateValue.searchNoteInput = ''; // Reset search input when notebook change
            stateValue.selectedTag = ''; // Reset tag selected when notebook change
            state = Object.assign({}, state, stateValue);
            break;

        case SEARCHNOTEINPUT:
            stateValue.searchNoteInput = action.value;
            state = Object.assign({}, state, stateValue);
            break;

        case SELECTNOTE:
            stateValue.selectedNote = action.uuid;
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

        case FETCH_APPINFO_REQUEST:
            stateValue.isFetchingAppInfo = true;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_APPINFO_SUCCESS:
            stateValue.isFetchingAppInfo = false;
            stateValue.appInfo = action.data;
            state = Object.assign({}, state, stateValue);
            break;

        case FETCH_APPINFO_FAILURE:
            stateValue.isFetchingAppInfo = false;
            state = Object.assign({}, state, stateValue);
            break;

        case SELECTTAG:
            stateValue.selectedTag = action.tag;
            state = Object.assign({}, state, stateValue);
            break;

        default:
            break;
    }

    return state;
}

export default main
