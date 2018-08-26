import {connect} from 'react-redux'
import * as actions from '../actions'
import App from "../components/App"

const mapStateToProps = state => {
    return {
        isFetchingNotebooks: state.main.isFetchingNotebooks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotebooks: () => {
            dispatch(actions.fetchNotebooks())
        },
        fetchAppInfo: () => {
            dispatch(actions.fetchAppInfo())
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
