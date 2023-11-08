import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import { RequireAuth } from 'react-auth-kit';


export default function App() {

  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed/:id' element={
          <RequireAuth loginPath='/'>
            <Feed />
          </RequireAuth>
        } />
      </Routes>
  )
}