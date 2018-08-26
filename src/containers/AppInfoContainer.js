import {connect} from 'react-redux'
//import * as actions from '../actions'
import AppInfo from "../components/AppInfo"

const mapStateToProps = state => {
    return {
        isFetchingAppInfo: state.main.isFetchingAppInfo,
        appInfo: state.main.appInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

const AppInfoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppInfo)

export default AppInfoContainer
