import React from 'react'
import { render } from 'react-dom'
import {MemoryRouter} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import AppContainer from './containers/AppContainer'

import './css/app.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    window.preloadedState || {},
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
)

render(
    <Provider store={store}>
        <MemoryRouter
            //initialEntries={[ '/dashboard', 'netatmo', '/calendar', '/webcams', '/settings', 'welcome', 'login-cbscreen', 'login-netatmo' ]}
            initialEntries={[ '/' ]}
            initialIndex={0}>
            <AppContainer />
        </MemoryRouter>
    </Provider>,
    document.getElementById('app-root')
)
