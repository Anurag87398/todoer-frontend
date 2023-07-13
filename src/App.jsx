import React from 'react'
import './App.css'
import Header from './header'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import ToDoPage from './ToDoPage'
import { Route, Routes } from 'react-router-dom'

export const URL= import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function App() {
  // console.log(import.meta.env.VITE_REACT_APP_SERVER_URL);
  return (
    <div>
        <Header />
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/todo' element={<ToDoPage />}></Route>
        </Routes>
    </div>
  )
}