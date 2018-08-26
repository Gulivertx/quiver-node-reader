import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr-ch'

moment.locale('fr-ch')
import Highlight from 'react-highlight'

const Note = (props) => {

    const {isFetchingNote, note} = props

    return (
        note.title === '' ? (
            <div className='text-center mt-5 text-uppercase h1'>Please select a note</div>
            ) : (
            isFetchingNote ? (
                <div className='text-center mt-5 text-uppercase h1'>Loading...</div>
            ) : (
                <article style={{height: '100%', maxHeight: '100%'}}>
                    <section className='sub-header'>
                        <h2 className='text-uppercase'>{note.title}</h2>
                        {
                            note.tags.map((tag, index) => <button key={index} type='button' className='btn btn-info btn-sm tags text-uppercase'>{tag}</button>)
                        }
                        <div className='mt-2 small text-muted'>
                            Created at: {moment.unix(note.created_at).format('DD.MM.YYYY - HH:mm')} - Updated at: {moment.unix(note.updated_at).format('DD.MM.YYYY - HH:mm')}
                        </div>
                    </section>

                    <hr/>

                    <div className='scrollbar-container-reader' id='reader'>
                        <section className='note-cells'>
                            {
                                note.cells.map((cell, index) => {
                                    return (
                                        cell.type === 'text' ? (
                                            <div key={index} dangerouslySetInnerHTML={{__html: cell.data}}/>
                                        ) : (
                                            <Highlight key={index}>
                                                {cell.data}
                                            </Highlight>
                                        )
                                    )
                                })
                            }
                        </section>
                    </div>
                </article>
            )
        )
    )
}

Note.propTypes = {
    selectedNote: PropTypes.string.isRequired,
    isFetchingNote: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired
}

export default Note
