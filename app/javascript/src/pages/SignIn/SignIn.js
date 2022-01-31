import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { withStyles } from '@mui/styles'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import {
  Link
} from "react-router-dom"
import { signIn } from '../../store/auth/authSlice'
import GlobalAlert from '../../components/GlobalAlert/GlobalAlert'
import styles from './SignIn.css'

const SignIn = ({
  authToken,
  classes,
  loginSuccess,
  loginFailure,
  signIn,
  url
}) => {
  const navigate = useNavigate()
  const [errorAlert, setErrorAlert] = useState(false)
  const emailFieldRef = useRef()
  const passwordFieldRef = useRef()

  const handleSubmit = async () => {
    const email = emailFieldRef.current.value
    const password = passwordFieldRef.current.value
    setErrorAlert(false)
    signIn({ data: { user: {email, password} } })
  }

  useEffect(() => {
    if (loginSuccess || authToken) {
      navigate('/')
    }
  }, [loginSuccess, navigate, authToken])

  useEffect(() => {
    if (loginFailure) {
      setErrorAlert(true)
    }
  }, [loginFailure])

  const closeAlert = () => setErrorAlert(false)

  return (
    <>
      { errorAlert &&
        <GlobalAlert
          severity="error"
          onClose={closeAlert}
          message="Please provide valid email / password to login."
        />
      }
      <Paper elevation={24} className={classes.root}>
        <div className={classes.fieldWrapper}>
          <Typography variant='h5'>Sign In</Typography>
        </div>
        <div className={classes.fieldWrapper}>
          <TextField
            required
            id="signin-email"
            label="Email"
            classes={{ root: classes.textFieldRoot }}
            inputRef={emailFieldRef}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <TextField
            required
            id="signin-password"
            label="Password"
            type="password"
            classes={{ root: classes.textFieldRoot }}
            inputRef={passwordFieldRef}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <Button variant="contained" onClick={handleSubmit} size="medium" classes={{root: classes.button}}>
            Log In
          </Button>
        </div>
        <div className={classes.actionWrapper}>
          <div>New user? <Link to="/sign_up">Sign Up</Link></div>
        </div>
      </Paper>

    </>
  )
}

SignIn.propTypes = {
  authToken: PropTypes.string,
  classes: PropTypes.object,
  loginSuccess: PropTypes.bool,
  loginFailure: PropTypes.bool,
  signIn: PropTypes.func.isRequired
}

SignIn.defaultProps = {
  authToken: '',
  classes: {},
  loginSuccess: false,
  loginFailure: false
}


const mapStateToProps = ({ auth }) => {
  const {
    loginSuccess,
    loginFailure,
    token
  } = auth
  return {
    authToken: token,
    loginSuccess,
    loginFailure,
  }
}

const mapDispatchToProps = {
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn))
