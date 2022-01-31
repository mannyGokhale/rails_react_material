import React from 'react'
import PropTypes from 'prop-types'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'

const Entry = (props) => {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  )
}

export default Entry