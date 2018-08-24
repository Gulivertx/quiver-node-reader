import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import App from "../components/App"

const mapStateToProps = state => {
    return {
        notebooks: state.main.notebooks,
        isFetchingNotebooks: state.main.isFetchingNotebooks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotebooks: () => {
            dispatch(actions.fetchNotebooks())
        }
    }
}

const AppContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))

export default AppContainer
