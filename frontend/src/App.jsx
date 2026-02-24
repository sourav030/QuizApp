import React, { useContext } from 'react'
import Navbar from './component/Navbar'
import Home from './page/Home'
import { Route, Routes } from 'react-router-dom'
import Profile from './page/Profile'
import Login from './page/Login'
import { AuthContext } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Question from './page/Question'
import Footer from './component/Footer'

const App = () => {
  const {token}=useContext(AuthContext)
  return (
    <div>
      {
        token? <Navbar />: <Login/>
      }
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/question/:id'  element={<Question />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

      {token? <Footer/>:null}
      
    </div>
  )
}

export default App
