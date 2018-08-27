import {connect} from 'react-redux'
import * as actions from '../actions'
import Notebook from '../components/Notebook'

const mapStateToProps = state => {
    return {
        notebooks: state.main.notebooks,
        selectedNotebook: state.main.selectedNotebook,
        searchNoteInput: state.main.searchNoteInput,
        selectedNote: state.main.selectedNote,
        selectedTag: state.main.selectedTag
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSearchNoteInput: (event) => {
            dispatch(actions.changeSearchNoteInput(event))
        },
        changeSelectedNote: (uuid) => {
            dispatch(actions.changeSelectedNote(uuid))
        },
        fetchNote: (path) => {
            dispatch(actions.fetchNote(path))
        },
        changeSelectedTag: (tag) => {
            dispatch(actions.changeSelectedTag(tag))
        }
    }
}

const NotebookContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notebook)

export default NotebookContainer
