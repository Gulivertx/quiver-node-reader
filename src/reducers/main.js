/** Import from actions here **/
import {
    FETCH_NOTEBOOKS_FAILURE,
    FETCH_NOTEBOOKS_REQUEST,
    FETCH_NOTEBOOKS_SUCCESS,
    SEARCHNOTEINPUT,
    SELECTNOTEBOOK
} from "../actions";

const defaultState = {
    isFetchingNotebooks: true,
    notebooks: [],
    selectedNotebook: '0',
    searchNoteInput: ''
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

        default:
            break;
    }

    return state;
}

export default main
