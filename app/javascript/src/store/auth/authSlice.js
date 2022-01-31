import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (authParams) => {
    const { data } = authParams
    return await axios
      .post(`/users/sign_in`, data, {
        headers: {
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

export const signOut = createAsyncThunk(
  "auth/signOut",
  async () => {
    return await axios
      .delete(`/users/sign_out`, {} )
      .then(response => {
        const data = response.data || {}
        return data
      })
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: 0,
  },
  reducers: {
    setAuthDataInStore (state, action) {
      const { currentUser, authToken } = action.payload
      state.currentUser = currentUser
      state.token = authToken
    }
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.loginSuccess = false
      state.loginFailure = false
    },
    [signIn.fulfilled]: (state, action) => {
      const { current_user: currentUser, authToken } = action.payload
      localStorage.setItem('authToken', authToken)
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      state.currentUser = currentUser
      state.token = authToken
      state.loginSuccess = true
      state.loginFailure = false

    },
    [signIn.rejected]: (state) => {
      state.currentUser = {}
      state.token = ''
      state.loginSuccess = false
      state.loginFailure = true
    },
    [signOut.fulfilled]: (state) => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('currentUser')
      state.currentUser = null
      state.token = null
      state.loginSuccess = false
      state.loginFailure = false

    }
  },
})

export const { setAuthDataInStore } = authSlice.actions

export default authSlice.reducer