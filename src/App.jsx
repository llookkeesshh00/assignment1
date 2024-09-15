import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Student from './pages/Student'
import ABC from './pages/ABC'
import Edit from './pages/Edit'
function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Student/>}/>
      <Route path='/submitted' element={<ABC/>}/>
      <Route path='/edit' element={<Edit/>}/>
    </Routes >
    </>
  )
}

export default App
