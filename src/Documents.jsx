import { useState, useEffect } from 'react';
import DocsContainer from './DocsContainer';
  




function Documents() {


    const categoryId = 2

   


    //console.log(documentCollection);
return(
    <div>
        <div className='titlePageDiv'>
    <h1 className='pageTitle laptop:laptoppageTitle landscape:text-2xl'> Autres Programmes</h1>
    
        </div>
    <DocsContainer value={categoryId}/>
    </div>


)


   
}





export default Documents