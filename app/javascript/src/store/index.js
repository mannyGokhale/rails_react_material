import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import registrationReducer from './registration/registrationSlice'
import invitationReducer from './invitation/invitationSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    invitation: invitationReducer
  },
})