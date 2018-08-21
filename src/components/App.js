import React from 'react'
import PropTypes from 'prop-types'
import loadable from 'loadable-components'
import {Switch, Route, NavLink} from 'react-router-dom'
import Transition from 'react-transition-group/Transition'
import {TransitionGroup, CSSTransition} from "react-transition-group"

/** React components **/
//const ExampleContainer = loadable(() => import('../containers/ExampleContainer'));

class App extends React.Component {
    constructor(props) {
        super(props);

        // here is what is needed in constructor
    }

    render() {


        return (
            <div>
                <h1>{this.props.initState}</h1>
            </div>
        )
    }
}

App.propTypes = {
    initState: PropTypes.string.isRequired
}

export default App
