import React from 'react'
import PropTypes from 'prop-types'
import StaticAppBar from '@mui/material/AppBar'
import {
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material'

const AppBar = ({
  email,
  handleSignOut
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StaticAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Awesome App
          </Typography>
          Welcome {email}! <Button color="inherit" onClick={handleSignOut}>Signout</Button>
        </Toolbar>
      </StaticAppBar>
    </Box>
  )
}

AppBar.propTypes = {
  email: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired
}

export default AppBar