import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { withStyles } from '@mui/styles'
import styles from './InvitationForm.css'

const InvitationForm = ({
  classes,
  sendInvitation
}) => {
  const emailFieldRef = useRef()

  const handleSubmit = () => {
    const email = emailFieldRef.current.value
    sendInvitation({ email })
    emailFieldRef.current.value = ""
  }

  return (
    <div>
      <Paper elevation={24} className={classes.root}>
        <div className={classes.fieldWrapper}>
          <Typography variant='h5'>Invite User</Typography>
        </div>
        <div className={classes.fieldWrapper}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            classes={{ root: classes.textFieldRoot }}
            inputRef={emailFieldRef}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <Button variant="contained" onClick={handleSubmit} size="medium" classes={{root: classes.button}}>
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  )
}

InvitationForm.propTypes = {
  classes: PropTypes.object,
  sendInvitation: PropTypes.func.isRequired
}

InvitationForm.defaultProps = {
  classes: {}
}

export default withStyles(styles)(InvitationForm)