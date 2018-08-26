import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr-ch'

moment.locale('fr-ch')

const AppInfo = (props) => {

    const {isFetchingAppInfo, appInfo} = props

    return (
        <section className='app-box'>
            <div className='app-container'>
                <div className='text-uppercase'>{appInfo.name}</div>
                <div className='small'>
                    Version: {appInfo.version}<br/>
                    By {appInfo.author.name}<br/>
                    <a href={appInfo.repository}>Github</a>
                </div>
            </div>
        </section>
    )
}

AppInfo.propTypes = {
    isFetchingAppInfo: PropTypes.bool.isRequired,
    appInfo: PropTypes.object.isRequired
}

export default AppInfo
