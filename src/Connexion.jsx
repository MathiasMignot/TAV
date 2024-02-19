import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import  useUserStore  from './userStore.js';
import React from "react";

export default function Connexion(){
   
   
    const userToken = useUserStore((state) => state.userToken)
    const userMail = useUserStore((state) => state.userMail)
    const isConnected = useUserStore((state) => state.isConnected)
    const updateUserMail = useUserStore(state => state.updateUserMail)
    const updateIsConnected = useUserStore(state => state.updateIsConnected)
    const updateUserToken = useUserStore(state => state.updateUserToken)
    console.log(import.meta.env.VITE_APIURL);

    const navigate = useNavigate();
    let connected = false;


const handleConnect = (e) => {

    
    e.preventDefault() ;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const formdata = {
        email,
        password
    }
    console.log(isConnected);

        

        

        axios.post(`${import.meta.env.VITE_APIURL}users/login`, formdata,{
        
    }).then(function(response){
        
        updateUserToken(response.data.token)
        updateUserMail(response.data.data.email)
        updateIsConnected(true)
       


           navigate('/')
        }).catch((error)=>{
            console.log(error);
            alert("Une erreur est survenue")

        })
}
    return(

        <form className="formContainerLogin laptopformContainerLogin tablet:w-[80%]" action="post" onSubmit={handleConnect}>
            <label htmlFor="email">Votre email</label>
            <input type="email" id="email" placeholder="email.exemple@gmail.com" />

            <label htmlFor="password">Votre mot de passe</label>
            <input type="password" id="password" placeholder="Votre mot de passe" />
            <button className="btnFormLogin" type="submit">Se connecter</button>

        </form>
    )



}