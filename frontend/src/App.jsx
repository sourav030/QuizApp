import React, { useContext } from 'react'
import Navbar from './component/Navbar'
import Home from './page/Home'
import { Route, Routes } from 'react-router-dom'
import Profile from './page/Profile'
import Login from './page/Login'
import { AuthContext } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import Question from './page/Question'
import Footer from './component/Footer'
import CreateQuiz from './page/CreateQuiz'
import ProtectedRoute from './page/Protactive'

const App = () => {

  const { token } = useContext(AuthContext)

  return (
    <div>

      {token && <Navbar />}

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/question/:id" element={<Question />} />

        <Route
          path="/createQuiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

      {token && <Footer />}

    </div>
  )
}

export default App