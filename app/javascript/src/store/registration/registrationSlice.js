import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const signUp = createAsyncThunk(
  "registration/signUp",
  async (authParams) => {
    console.log(authParams)
    const { user } = authParams
    const token = localStorage.getItem('authToken')
    return await axios
      .post(`/users`, { user }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const data = response.data || {}
        const authToken = response.headers['authorization']
        localStorage.getItem('authToken')
        return { ...data, authToken }
      })
  }
)
export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    value: 0,
  },
  reducers: {
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.signUpSuccess = false
      state.signUpFailure = false
    },
    [signUp.fulfilled]: (state, action) => {
      const { current_user: currentUser, authToken } = action.payload
      state.currentUser = currentUser
      state.token = authToken
      state.signUpSuccess = true
      state.signUpFailure = false
    },
    [signUp.rejected]: (state, action) => {
      state.currentUser = {}
      state.token = ''
      state.signUpSuccess = false
      state.signUpFailure = true
    },
  },
})

export default registrationSlice.reducer