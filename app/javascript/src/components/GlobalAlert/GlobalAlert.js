import React from 'react'
import PropTypes from 'prop-types'

import {
  Alert
} from '@mui/material'

const GlobalAlert = ({
  message,
  severity,
  onClose
})  => {
  return (
    <Alert
      severity={severity}
      onClose={onClose}
    >
      {message}
    </Alert>
  )
}

GlobalAlert.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}


export default GlobalAlert