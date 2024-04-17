import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Attendance from './pages/Attendance'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from './pages/Students'
import { StoreWrap } from './database/store'
import StudentId from './pages/StudentId';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreWrap>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Home />} />   
      <Route path='/attendance' element={ <Attendance />} />   
      <Route path='/students' element={ <Students />} />   
      <Route path='/students/:id' element={ <StudentId />} />   
    </Routes>
    </BrowserRouter>
    </StoreWrap>
  </React.StrictMode>,
)
