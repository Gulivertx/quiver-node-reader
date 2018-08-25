import {connect} from 'react-redux'
import * as actions from '../actions'
import Note from "../components/Note"

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Note)

export default NoteContainer
