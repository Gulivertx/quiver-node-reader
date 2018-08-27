import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')

const NotebooksTags = (props) => {
    const {notebooks, selectedNotebook, changeSearchNoteInput, searchNoteInput, changeSelectedNote, fetchNote, selectedNote, selectedTag, changeSelectedTag} = props

    const linkOnClick = (path, uuid) => {
        changeSelectedNote(uuid)
        fetchNote(encodeURIComponent(path))
    }

    return (
        <div style={{maxHeight: '100%', height: '100%'}}>
            <section className='sub-header'>
                <h5 className='text-uppercase text-center'>
                    {notebooks[selectedNotebook].name + ' '}
                    <small className='text-muted'>
                        {
                            notebooks[selectedNotebook].notes.length} notes{selectedTag ? (
                                <button type="button" className='btn btn-info btn-sm tags text-uppercase ml-2' onClick={() => changeSelectedTag('')}>{selectedTag}</button>
                            ) : (null)
                        }
                    </small>
                </h5>
                <div className='form-group'>
                    <label className='input-group-sm w-100'>
                        <input type='search' className='form-control input-sm' placeholder='Search...' value={searchNoteInput} onChange={changeSearchNoteInput}/>
                    </label>
                </div>
            </section>

            <div className='scrollbar-container-notebooks' id='notebooks'>
                <ul className='list-group list-group-flush'>
                    {
                        notebooks[selectedNotebook].notes.filter(note => {
                            let title = note.title.toLowerCase()
                            title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                            return searchNoteInput === '' || title.includes(searchNoteInput)
                        })
                            .filter(note => {
                                return selectedTag === '' || note.tags.includes(selectedTag)
                            })
                            .map((note, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={cx('list-group-item list-group-item-action', note.uuid === selectedNote ? 'active':null)}
                                        onClick={() => linkOnClick(note.dir, note.uuid)}>
                                        {note.title}
                                        <div className='small text-muted mt-2'>{moment.unix(note.updated_at).format('DD.MM.YYYY - HH:mm')}</div>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

NotebooksTags.propTypes = {
    notebooks: PropTypes.array.isRequired,
    selectedNotebook: PropTypes.number.isRequired,
    changeSearchNoteInput: PropTypes.func.isRequired,
    searchNoteInput: PropTypes.string.isRequired,
    changeSelectedNote: PropTypes.func.isRequired,
    fetchNote: PropTypes.func.isRequired,
    selectedNote: PropTypes.string.isRequired,
    selectedTag: PropTypes.string.isRequired,
    changeSelectedTag: PropTypes.func.isRequired
}

export default NotebooksTags
