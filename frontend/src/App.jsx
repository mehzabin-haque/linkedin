import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './components/Register.jsx'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      {/* <Route path='/register' element={ <Register /> } /> */}
    </Routes>
  )
}