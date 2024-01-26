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
    url: 'http://localhost:3000/api/users/logout',
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
      <img src={logo} alt="logo du site " className="logo"/>
      <nav className='button-headerUp-nav'>

      <Link to='/'>
              <button className="button-headerUp">Acceuil</button>
            </Link> 

    <div>
      {isConnected ? 
        <button className="button-headerUp" onClick={handleLogout}>Déconnexion</button>      :
      <Link to='/connexion'>
              <button className="button-headerUp">Connexion</button>
            </Link> 
    }
            </div>
            </nav>
            </div>
       <nav>
      <ul className='containerNav'>
       <Link to="/weeklyMeeting"><li  className='liHeader'><button className="btnHeader">Réunions de semaine</button></li></Link> 
       <Link to="/discours"> <li className='liHeader'><button className="btnHeader">Discours</button></li></Link> 
       <Link to="/predication"> <li className='liHeader'><button className="btnHeader">Prédication</button></li></Link>        
       <Link to="/documents"><li className='liHeader'><button className="btnHeader">Autres programmes</button></li></Link> 
      </ul>
      </nav>

     

    </header>
      
    
  )
}

export default Header
