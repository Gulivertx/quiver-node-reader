import React from 'react'
import PropTypes from 'prop-types'
import loadable from 'loadable-components'
import {Switch, Route} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')
//import Transition from 'react-transition-group/Transition'
//import {TransitionGroup, CSSTransition} from "react-transition-group"

/** React components **/
const NotebookContainer = loadable(() => import('../containers/NotebookContainer'))
const NoteContainer = loadable(() => import('../containers/NoteContainer'))

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.fetchNotebooks()
    }

    render() {
        const {isFetchingNotebooks} = this.props

        return (
            isFetchingNotebooks ? (
                <div>Loading...</div>
            ) : (
                <Switch location={this.props.location}>
                    <Route exact path='/' component={NotebookContainer} />
                    <Route path='/note' component={NoteContainer} />
                </Switch>
            )
        )
    }
}

App.propTypes = {
    isFetchingNotebooks: PropTypes.bool.isRequired,
    fetchNotebooks: PropTypes.func.isRequired,
}

export default App
