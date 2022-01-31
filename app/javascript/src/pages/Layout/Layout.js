import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../components/AppBar/AppBar'
import { connect } from 'react-redux'
import { signOut } from '../../store/auth/authSlice'

const Layout = ({
  currentUser = {},
  signOut,
  children
}) => {
  const { email } = currentUser
  return (
    <>
      <AppBar email={email} handleSignOut={signOut} />
      {children}
    </>
  )
}

Layout.propTypes = {
  currentUser: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  children: PropTypes.node
}

Layout.defaultProps = {
  currentUser: {}
}

const mapStateToProps = ({ auth }) => {
  const {
    currentUser
  } = auth

  return {
    currentUser
  }
}

const mapDispatchToProps = {
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)