import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, combineReducers} from 'redux'
import * as reducers from './reducers'

import Screen from './containers/screen'

import './main.scss'

const store = createStore(combineReducers(reducers))

ReactDOM.render(
  <Provider store={store}>
    <div className='background'>
      <Screen />
    </div>
  </Provider>,
  document.getElementById('root')
)
