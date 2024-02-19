import axios from 'axios'
import { useState, useEffect } from 'react'
import DocsContainer from './DocsContainer';


function WeeklyMeeting () {

    const categoryId = 4
    return(
        <div>
             <div className='titlePageDiv'>
        <h1 className='pageTitle laptop:laptoppageTitle tablet:text-5xl landscape:text-2xl'> Réunion de semaine</h1>
        </div>
        <DocsContainer value={categoryId}/>
        </div>
    
    
    )
    
        }





export default WeeklyMeeting