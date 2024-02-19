import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/TAV logo.png'
import  useUserStore  from './userStore.js';
import axios from 'axios';


function Header() {
  const userToken = useUserStore((state) => state.userToken)

  const isConnected = useUserStore((state) => state.isConnected)

    const updateUserMail = useUserStore(state => state.updateUserMail)
    const updateIsConnected = useUserStore(state => state.updateIsConnected)
    const updateUserToken = useUserStore(state => state.updateUserToken)
  


 const handleLogout = () => {

  updateUserToken('')
    updateUserMail('')
    updateIsConnected(false)

  axios({
    method: 'get',
    url: `${import.meta.env.VITE_APIURL}users/logout`,
    headers: {Authorization: `Bearer ${userToken}`}
  }).then(() =>{

    

  })
    .catch((err) => {
      console.error(err);
    })
}

  return (

    <header className='header'>
      <div className='headerUp'>
      <img src={logo} alt="logo du site " className="logo laptop:laptopLogo tablet:w-[20%] landscape:w-[15%]"/>
      <nav className='button-headerUp-nav laptop:laptop-button-headerUp-nav'>

      <Link to='/'>
              <button className="button-headerUp laptop:laptop_button-headerUp landscape:w-[60%] landscape:py-2">Acceuil</button>
            </Link> 

    <div>
      {isConnected ? 
        <button className="button-headerUp laptop:laptop_button-headerUp landscape:w-[60%] landscape:py-2" onClick={handleLogout}>Déconnexion</button>      :
      <Link to='/connexion'>
              <button className="button-headerUp laptop:laptop_button-headerUp landscape:w-[60%] landscape:py-2">Connexion</button>
            </Link> 
    }
            </div>
            </nav>
            </div>
       <nav>
      <ul className='containerNav'>
       <Link to="/weeklyMeeting"><li  className='liHeader tablet:px-2 land'><button className="btnHeader laptop:laptopbtnHeader tablet:text-2xl landscape:text-lg  ">Réunions de semaine</button></li></Link> 
       <Link to="/discours"> <li className='liHeader tablet:px-2'><button className="btnHeader laptop:laptopbtnHeader tablet:text-2xl landscape:text-lg">Discours</button></li></Link> 
       <Link to="/predication"> <li className='liHeader tablet:px-2'><button className="btnHeader laptop:laptopbtnHeader tablet:text-2xl landscape:text-lg">Prédication</button></li></Link>        
       <Link to="/documents"><li className='liHeader tablet:px-2'><button className="btnHeader laptop:laptopbtnHeader tablet:text-2xl landscape:text-lg">Autres programmes</button></li></Link> 
      </ul>
      </nav>

     

    </header>
      
    
  )
}

export default Header
