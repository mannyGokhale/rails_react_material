import React, { useLayoutEffect } from "react"
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom"
import { connect } from 'react-redux'
import SignIn from "./pages/SignIn/SignIn"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./pages/Home/Home"
import { setAuthDataInStore } from './store/auth/authSlice'
import Layout from "./pages/Layout/Layout"

const App = ({
  authToken,
  setAuthDataInStore
}) => {
  useLayoutEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const currentUser = localStorage.getItem('currentUser')

    setAuthDataInStore({
      authToken,
      currentUser: currentUser ? JSON.parse(currentUser) : {}
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/sign_in" authToken={authToken}>
              <Layout><Home /></Layout>
            </RequireAuth>
          }
        />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

const RequireAuth = ({ children, redirectTo, authToken }) => {
  return authToken && authToken.length > 0
    ? children
    : <Navigate to={redirectTo} />
}

const mapStateToProps = ({ auth }) => {
  const { token } = auth

  return {
    authToken: token
  }
}
const mapDispatchToProps = {
  setAuthDataInStore
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
