import { useState, createContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'
import { Outlet } from 'react-router-dom';



function App() {


  return (

    <div>
        <Header />
        <div className='bodyApp' >
          <Outlet />
        </div>
    </div>






  )
}

export default App
