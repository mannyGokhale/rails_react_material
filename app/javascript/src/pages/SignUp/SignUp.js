import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { withStyles } from '@mui/styles'
import {
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import {
  Link,
  useNavigate
} from "react-router-dom"
import { connect } from 'react-redux'
import { signUp } from '../../store/registration/registrationSlice'
import GlobalAlert from '../../components/GlobalAlert/GlobalAlert'
import styles from './SignUp.css'

const SignUp = ({
  authToken,
  classes,
  signUp,
  signUpFailure,
  signUpSuccess
}) => {
  const navigate = useNavigate()
  const [errorAlert, setErrorAlert] = useState(false)
  const emailFieldRef = useRef()
  const passwordFieldRef = useRef()
  const passwordConfirmationFieldRef = useRef()

  const handleSubmit = async () => {
    const user = {
      email: emailFieldRef.current.value,
      password: passwordFieldRef.current.value,
      password_confirmation: passwordConfirmationFieldRef.current.value
    }
    setErrorAlert(false)
    signUp({ user })
  }

  useEffect(() => {
    if (signUpSuccess || authToken) {
      navigate('/')
    }
  }, [authToken, signUpSuccess, navigate])

  useEffect(() => {
    if (signUpFailure) {
      setErrorAlert(true)
    }
  }, [signUpFailure, setErrorAlert])

  const closeAlert = () => setErrorAlert(false)

  return (
    <>
      { errorAlert &&
        <GlobalAlert
          severity="error"
          onClose={closeAlert}
          message="Sign up error! Please provide valid details."
        />
      }
      <Paper elevation={24} className={classes.root}>
        <div className={classes.fieldWrapper}>
          <Typography variant='h5'>Sign Up</Typography>
        </div>
        <div className={classes.fieldWrapper}>
          <TextField
            required
            id="email"
            label="Email"
            classes={{ root: classes.textFieldRoot }}
            inputRef={emailFieldRef}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            classes={{ root: classes.textFieldRoot }}
            inputRef={passwordFieldRef}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <TextField
            required
            id="password-confirmation"
            label="Password Confirmation"
            type="password"
            classes={{ root: classes.textFieldRoot }}
            inputRef={passwordConfirmationFieldRef}
          />
        </div>
        <div className={classes.fieldWrapper}>
          <Button variant="contained" onClick={handleSubmit} size="medium" classes={{root: classes.button}}>
            Sign Up
          </Button>
        </div>
        <div>
          Alread have an account? <Link to='/sign_in'>Sign In</Link>
        </div>
      </Paper>
    </>
  )
}

SignUp.propTypes = {
  authToken: PropTypes.string,
  classes: PropTypes.object,
  signUp: PropTypes.func.isRequired,
  signUpFailure: PropTypes.bool,
  signUpSuccess: PropTypes.bool
}

SignUp.defaultProps = {
  authToken: '',
  classes: {},
  signUpFailure:false,
  signUpSuccess: false
}

const mapDispatchToProps = {
  signUp
}

const mapStateToProps = ({ auth, registration }) => {
  const {
    signUpSuccess,
    signUpFailure
  } = registration

  const {
    token: authToken
  } = auth
  return {
    authToken,
    signUpSuccess,
    signUpFailure
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
