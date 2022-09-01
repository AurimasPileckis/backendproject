import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import NewBook from './pages/NewBook'
import NotFound from './pages/404.js'
import EditBook from './pages/EditBook'
import SingleBook from './pages/SingleBook'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Header from './components/Header/Header'
import './App.css';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
      if(localStorage.getItem('loggedIn') === 'true')
      setLoggedIn(true)
  }, [])

  return (
  <BrowserRouter>
    <Header loggedIn={loggedIn} />
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/book/:id" element={<SingleBook />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
      <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn}/>} />
      <Route path="*" element={<NotFound />} />
      { loggedIn &&
      <>
      <Route path="/new-post" element={<NewBook />} />
      <Route path="/edit/:id" element={<EditBook />} />
      </>
      }
    </Routes>
  </BrowserRouter>
  )
}
export default App