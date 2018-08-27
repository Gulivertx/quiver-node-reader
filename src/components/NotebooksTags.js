import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import moment from 'moment'
import 'moment/locale/fr-ch'

moment.locale('fr-ch')

const NotebooksTags = (props) => {
    const {notebooks, selectedNotebook, changeSelectedNotebook, changeSelectedTag} = props

    return (
        <div>
            <nav>
                <h5 className='text-uppercase'>Notebooks</h5>
                <ul className='list-group list-group-flush mb-4'>
                    {
                        notebooks.map((notebook, index) => {
                            return (
                                <li
                                    key={index}
                                    className={cx('list-group-item list-group-item-action d-flex justify-content-between align-items-center', index === selectedNotebook ? 'active' : null)}
                                    onClick={() => changeSelectedNotebook(index)}>
                                    {notebook.name}
                                    <span>{notebook.notes.length}</span>
                                </li>
                            )
                        })
                    }
                </ul>

                {
                    notebooks[selectedNotebook].tags.length > 0 ? (
                        <section className='tags-box'>
                            <h5 className='text-uppercase'>Tags <small
                                className='text-muted'>{notebooks[selectedNotebook].name}</small></h5>
                            {
                                notebooks[selectedNotebook].tags.map((tag, index) => <button
                                    key={index}
                                    type="button"
                                    className='btn btn-info btn-sm tags text-uppercase'
                                    onClick={() => changeSelectedTag(tag)}>
                                    {tag}
                                </button>)
                            }
                        </section>
                    ) : (
                        null
                    )
                }

            </nav>
        </div>
    )
}

NotebooksTags.propTypes = {
    notebooks: PropTypes.array.isRequired,
    selectedNotebook: PropTypes.number.isRequired,
    changeSelectedNotebook: PropTypes.func.isRequired,
    changeSelectedTag: PropTypes.func.isRequired
}

export default NotebooksTags
