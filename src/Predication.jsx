import axios from 'axios'
import { useState, useEffect } from 'react'
import DocsContainer from './DocsContainer';
import { Link, useNavigate } from 'react-router-dom';
import presentoire from './assets/presentoire.jpg'


function Predication() {
    const categoryId = 3

    return(
        <div>
            <div className=' titlePageDiv laptop:laptoptitlePageDiv tablet:items-center gap-40'>
        <h1 className='pageTitle h-[50%] laptop:laptoppageTitle tablet:text-5xl landscape:text-2xl'> Prédication</h1>
        <Link className='link_presentoire laptop:laptop_link_presentoire' to='/presentoire'>
                    <button className='btnPresLink laptop:laptopbtnPresLink'>Programme présentoire</button>
                    </Link>
        </div>
        <DocsContainer value={categoryId}/>
        </div>
    
    
    )
    
}





export default Predication