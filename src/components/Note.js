import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr-ch'
moment.locale('fr-ch')

const Note = () => {
    return (
        <div>Reader</div>
    )
}

Note.propTypes = {
    //notebooks: PropTypes.array.isRequired,
}

export default Note
