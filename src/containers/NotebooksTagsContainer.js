import {connect} from 'react-redux'
import * as actions from '../actions'
import NotebooksTags from '../components/NotebooksTags'

const mapStateToProps = state => {
    return {
        notebooks: state.main.notebooks,
        selectedNotebook: state.main.selectedNotebook
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSelectedNotebook: (event) => {
            dispatch(actions.changeSelectedNotebook(event))
        }
    }
}

const NotebooksTagsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebooksTags)

export default NotebooksTagsContainer
