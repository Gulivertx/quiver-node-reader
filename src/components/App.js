import React from 'react'
import PropTypes from 'prop-types'
import loadable from 'loadable-components'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')
//import Transition from 'react-transition-group/Transition'
//import {TransitionGroup, CSSTransition} from 'react-transition-group'

/** React components **/
const NotebooksTagsContainer = loadable(() => import('../containers/NotebooksTagsContainer'))
const NotebookContainer = loadable(() => import('../containers/NotebookContainer'))
const NoteContainer = loadable(() => import('../containers/NoteContainer'))
const AppInfoContainer = loadable(() => import('../containers/AppInfoContainer'))

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.fetchNotebooks()
        this.props.fetchAppInfo()
    }

    render() {
        const {isFetchingNotebooks} = this.props

        return (
            isFetchingNotebooks ? (
                <div className='text-center mt-5 text-uppercase h1'>Loading...</div>
            ) : (
                <div className='main-container'>
                    <aside className='col-notebooks-tags'>
                        <NotebooksTagsContainer/>
                        <AppInfoContainer/>
                    </aside>
                    <aside className='col-notes'>
                        <NotebookContainer/>
                    </aside>
                    <section className='col-content-reader scrollbar' id='style-1'>
                        <NoteContainer/>
                    </section>

                    {/*<Switch location={this.props.location}>
                    <Route exact path='/' component={NotebookContainer} />
                    <Route path='/note' component={NoteContainer} />
                    </Switch>*/}
                </div>
            )
        )
    }
}

App.propTypes = {
    isFetchingNotebooks: PropTypes.bool.isRequired,
    fetchNotebooks: PropTypes.func.isRequired,
    fetchAppInfo: PropTypes.func.isRequired
}

export default App
