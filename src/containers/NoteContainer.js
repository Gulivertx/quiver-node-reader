import {connect} from 'react-redux'
import * as actions from '../actions'
import Note from "../components/Note"

const mapStateToProps = state => {
    return {
        selectedNote: state.main.selectedNote,
        isFetchingNote: state.main.isFetchingNote,
        note: state.main.note
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSelectedTag: (tag) => {
            dispatch(actions.changeSelectedTag(tag))
        }
    }
}

const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Note)

export default NoteContainer
