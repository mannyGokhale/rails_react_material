import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const sendInvitation = createAsyncThunk(
  "invitation/sendInvitation",
  async (inviationParams, { getState }) => {
    const state = getState()
    const { auth } = state
    const { token } = auth
    return await axios
      .post(`/invitations`, { invitation: inviationParams }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const data = response.data || {}
        const authToken = response.headers['authorization']
        return { ...data, authToken }
      })
  }
)

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState: {
   invitationSuccess: false,
   invitationFailure: false
  },
  reducers: {},
  extraReducers: {
    [sendInvitation.pending]: (state) => {
      state.invitationSuccess = false
      state.invitationFailure = false
    },
    [sendInvitation.fulfilled]: (state) => {
      state.invitationSuccess = true
      state.invitationFailure = false
      state.message = 'Invitation sent successfully!'
    },
    [sendInvitation.rejected]: (state) => {
      state.invitationSuccess = false
      state.invitationFailure = true
      state.message = 'Error while sending invite. Please try again!'
    }
  }
})


export default invitationSlice.reducer