import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import App from "../components/App"

const mapStateToProps = state => {
    return {
        initState: state.main.initState
    }
};

const mapDispatchToProps = dispatch => {
    return {
        /** dispatch actions here **/

    }
};

const AppContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));

export default AppContainer
