import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './components/Home'
import Login from './authentication/Login'
import Register from './authentication/Register'
import MyOrders from './components/MyOrders'
import MyCart from './components/MyCart'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/cart" element={<MyCart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
