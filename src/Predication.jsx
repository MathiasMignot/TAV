import axios from 'axios'
import { useState, useEffect } from 'react'
import DocsContainer from './DocsContainer';

function Predication() {
    const categoryId = 3

    return(
        <div>
            <div className='titlePageDiv'>
        <h1 className='pageTitle'> Prédication</h1>
        </div>
        <DocsContainer value={categoryId}/>
        </div>
    
    
    )
    
}





export default Predication