import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')

//import loadable from 'loadable-components'
//import {Switch, Route, NavLink} from 'react-router-dom'
//import Transition from 'react-transition-group/Transition'
//import {TransitionGroup, CSSTransition} from "react-transition-group"

/** React components **/
//const ExampleContainer = loadable(() => import('../containers/ExampleContainer'));

class App extends React.Component {
    constructor(props) {
        super(props);

        this.props.fetchNotebooks()
    }

    state = {notebookIndex: 0, inputSearch: ''}

    handleSelectNotebooksChange = (event) => {
        console.log(event)
        this.setState({notebookIndex: event.target.value});
    }

    handleSearchInputChange = (event) => {
        let serachTerm = event.target.value.toLowerCase() // Lower case
        serachTerm = serachTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Remove accents
        this.setState({inputSearch: serachTerm})
    }


    render() {
        const {notebooks, isFetchingNotebooks} = this.props
        const {notebookIndex, inputSearch} = this.state

        return (
            isFetchingNotebooks ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <nav className="form-group">
                        <label htmlFor="notebooksSelect">Choose a notebook</label>
                        <select className="form-control" id="notebooksSelect" value={this.state.notebookIndex} onChange={this.handleSelectNotebooksChange}>
                            {
                                notebooks.map((notebook, index) => <option key={index} value={index}>{notebook.name}</option>)
                            }
                        </select>
                    </nav>

                    <hr/>

                    <section className='sub-header'>
                        <h2 className='text-uppercase'>{notebooks[notebookIndex].name} <small className='text-muted'>{notebooks[notebookIndex].notes.length} notes</small></h2>
                    </section>

                    <section className='tags-box'>
                        {
                            notebooks[notebookIndex].tags.map((tag, index) => <button key={index} type="button" className="btn btn-warning btn-sm tags text-uppercase">{tag}</button>)
                        }
                    </section>

                    <section className='row'>
                        <div className='col-2'>
                            <label>
                                <input type="search" className="form-control input-sm" placeholder="Search..." onChange={(event) => this.handleSearchInputChange(event)}/>
                            </label>
                        </div>

                    </section>

                    <section className='row notes-list'>
                        {
                            notebooks[notebookIndex].notes.filter(note => {
                                let title = note.title.toLowerCase()
                                title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                                return inputSearch === '' || title.includes(inputSearch)
                            })
                            .map((note, index) => {
                                return (
                                    <div className='col-3' key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title text-uppercase">{note.title}</h6>
                                                <div className="card-text">
                                                    <div className='tags-list'>
                                                        {
                                                            note.tags.map((tag, index) => <button key={index} type="button" className="btn btn-info btn-sm tags text-uppercase">{tag}</button>)
                                                        }
                                                    </div>
                                                    <div className='card-info'>
                                                        Created at: {moment.unix(note.created_at).format('DD.MM.YYYY - HH:mm')}<br/>
                                                        Updated at: {moment.unix(note.updated_at).format('DD.MM.YYYY - HH:mm')}
                                                    </div>
                                                </div>
                                                <a href="#" className="btn btn-sm btn-block btn-secondary">Read</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
            )

        )
    }
}

App.propTypes = {
    notebooks: PropTypes.array.isRequired,
    isFetchingNotebooks: PropTypes.bool.isRequired,
    fetchNotebooks: PropTypes.func.isRequired
}

export default App
