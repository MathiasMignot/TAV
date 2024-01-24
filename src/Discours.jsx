
import DocsContainer from './DocsContainer';

function Discours () {

    const categoryId = 1

    return(
        <div>
            <div className='titlePageDiv'>
        <h1 className='pageTitle'>Discours</h1>
        </div>
        <DocsContainer value={categoryId}/>
        </div>
    
    
    )
    
   
        }





export default Discours