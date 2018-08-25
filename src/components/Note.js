import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, Route, Switch} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')

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
                <div>
                    <NavLink to='/'>Back</NavLink>

                    <section className='sub-header'>
                        <h2 className='text-uppercase'>{note.title} <small className='text-muted'></small></h2>
                    </section>
                </div>
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
