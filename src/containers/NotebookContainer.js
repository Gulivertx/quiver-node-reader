import {connect} from 'react-redux'
import * as actions from '../actions'
import Notebook from '../components/Notebook'

const mapStateToProps = state => {
    return {
        notebooks: state.main.notebooks,
        selectedNotebook: state.main.selectedNotebook,
        searchNoteInput: state.main.searchNoteInput
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSelectedNotebook: (event) => {
            dispatch(actions.changeSelectedNotebook(event))
        },
        changeSearchNoteInput: (event) => {
            dispatch(actions.changeSearchNoteInput(event))
        },
        changeSelectedNote: (path) => {
            dispatch(actions.changeSelectedNote(path))
        }
    }
}

const NotebookContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notebook)

export default NotebookContainer
