import axios from 'axios'
import { useState, useEffect } from 'react'
import DocsContainer from './DocsContainer';
import { Link, useNavigate } from 'react-router-dom';


function Predication() {
    const categoryId = 3

    return(
        <div>
            <div className='titlePageDiv'>
        <h1 className='pageTitle'> Prédication</h1>
        <Link  className='container_link_homePage_item' to="/Presentoire"><button className="btnHeader">Présentoire</button></Link> 

        </div>
        <DocsContainer value={categoryId}/>
        </div>
    
    
    )
    
}





export default Predication