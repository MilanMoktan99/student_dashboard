import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Students from './pages/Students'
import About from './pages/About'
import StudentDetails from './pages/StudentDetails'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/student' element={<Students />} />
        <Route path='/about' element={<About />} />
        <Route path='/student/:id' element={<StudentDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App