import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InvitationForm from '../../components/InvitationForm/InvitationForm'
import { connect } from 'react-redux'
import { sendInvitation } from '../../store/invitation/invitationSlice'
import GlobalAlert from '../../components/GlobalAlert/GlobalAlert'

// TODO: move all const string to a single file. It will help in I18n.
const SUCCESS_MESSAGE = "Invitation sent successfully."

const Home = ({
  sendInvitation,
  invitationSuccess
}) => {

  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (invitationSuccess) {
      setShowSuccess(true)
    }
  }, [invitationSuccess, setShowSuccess])

  const closeAlert = () => { setShowSuccess (false) }
  return (
    <>
      { showSuccess &&
        <GlobalAlert
          severity="success"
          onClose={closeAlert}
          message={SUCCESS_MESSAGE}
        />
      }
      <InvitationForm sendInvitation={sendInvitation} />
    </>
  )
}

Home.propTypes = {
  sendInvitation: PropTypes.func.isRequired,
  invitationSuccess: PropTypes.bool
}

Home.defaultProps = {
  invitationSuccess: false,
}

const mapStateToProps = ({ invitation }) => {
  const {
    invitationSuccess
  } = invitation

  return {
    invitationSuccess
  }
}

const mapDispatchToProps = {
  sendInvitation
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)