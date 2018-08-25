import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')

const Notebook = (props) => {
    const {notebooks, selectedNotebook, changeSelectedNotebook, changeSearchNoteInput, searchNoteInput, history, changeSelectedNote} = props

    const linkOnClick = (path) => {
        changeSelectedNote(path)
        history.push('/note')
    }

    return (
        <div>
            <nav className='form-group'>
                <label htmlFor='notebooksSelect'>Choose a notebook</label>
                <select className='form-control' id='notebooksSelect' value={selectedNotebook} onChange={changeSelectedNotebook}>
                    {
                        notebooks.map((notebook, index) => <option key={index} value={index}>{notebook.name}</option>)
                    }
                </select>
            </nav>

            <hr/>

            <section className='sub-header'>
                <h2 className='text-uppercase'>{notebooks[selectedNotebook].name} <small className='text-muted'>{notebooks[selectedNotebook].notes.length} notes</small></h2>
            </section>

            <section className='tags-box'>
                {
                    notebooks[selectedNotebook].tags.map((tag, index) => <button key={index} type="button" className='btn btn-warning btn-sm tags text-uppercase'>{tag}</button>)
                }
            </section>

            <section className='row'>
                <div className='col-12'>
                    <label>
                        <input type='search' className='form-control input-sm' placeholder='Search...' onChange={changeSearchNoteInput}/>
                    </label>
                </div>

            </section>

            <section className='row notes-list'>
                {
                    notebooks[selectedNotebook].notes.filter(note => {
                        let title = note.title.toLowerCase()
                        title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        return searchNoteInput === '' || title.includes(searchNoteInput)
                    })
                        .map((note, index) => {
                            return (
                                <div className='col-12 col-md-6 col-lg-3' key={index}>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h6 className='card-title text-uppercase'>{note.title}</h6>
                                            <div className='card-text'>
                                                <div className='tags-list'>
                                                    {
                                                        note.tags.map((tag, index) => <button key={index} type='button' className='btn btn-info btn-sm tags text-uppercase'>{tag}</button>)
                                                    }
                                                </div>
                                                <div className='card-info text-muted'>
                                                    Created at: {moment.unix(note.created_at).format('DD.MM.YYYY - HH:mm')}<br/>
                                                    Updated at: {moment.unix(note.updated_at).format('DD.MM.YYYY - HH:mm')}
                                                </div>
                                            </div>
                                            <button type='button' className='btn btn-sm btn-block btn-secondary' onClick={() => linkOnClick(note.dir)}>Read</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </section>
        </div>
    )
}

Notebook.propTypes = {
    notebooks: PropTypes.array.isRequired,
    selectedNotebook: PropTypes.string.isRequired,
    changeSelectedNotebook: PropTypes.func.isRequired,
    changeSearchNoteInput: PropTypes.func.isRequired,
    searchNoteInput: PropTypes.string.isRequired,
    changeSelectedNote: PropTypes.func.isRequired
}

export default withRouter(Notebook)
