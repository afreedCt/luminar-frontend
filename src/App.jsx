import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import { ToastContainer } from "react-toastify";

const App = () => {
  useEffect(() => {
            AOS.init({
                duration: 1000, // animation duration in ms
                once: true, // whether animation should happen only once
             });
        }, []);
  return (
    <>

    <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        theme="colored"
        draggable
      />

    <Routes>
      <Route path='/' element={<EmployeeList />} />
    </Routes>
      
    </>
  )
}

export default App