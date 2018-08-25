import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')
import Highlight from 'react-highlight'

class Note extends React.Component {
    constructor(props) {
        super(props);

        props.fetchNote(props.selectedNote)
    }

    render() {
        const {isFetchingNote, note} = this.props

        return (
            isFetchingNote ? (
                <div>Loading...</div>
            ) : (
                <article>
                    <NavLink to='/'>Back</NavLink>

                    <section className='sub-header'>
                        <h2 className='text-uppercase'>{note.title} <small className='text-muted'></small></h2>
                    </section>

                    <section className='tags-list'>
                        {
                            note.tags.map((tag, index) => <button key={index} type='button' className='btn btn-info btn-sm tags text-uppercase'>{tag}</button>)
                        }
                    </section>

                    <section className='note-info text-muted'>
                        Created at: {moment.unix(note.created_at).format('DD.MM.YYYY - HH:mm')}<br/>
                        Updated at: {moment.unix(note.updated_at).format('DD.MM.YYYY - HH:mm')}
                    </section>

                    <section className='note-cells'>
                        {
                            note.cells.map((cell, index) => {
                                return (
                                    cell.type === 'text' ? (
                                        <div key={index} dangerouslySetInnerHTML={{__html: cell.data}} />
                                    ) : (
                                        <Highlight key={index}>
                                            {cell.data}
                                        </Highlight>
                                    )
                                )
                            })
                        }
                    </section>
                </article>
                )
        )
    }
}

Note.propTypes = {
    selectedNote: PropTypes.string.isRequired,
    fetchNote: PropTypes.func.isRequired,
    isFetchingNote: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired
}

export default Note
