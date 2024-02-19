import axios, { formToJSON } from 'axios'
import { useState, useEffect } from 'react'
import  useUserStore  from './userStore.js';


export default function Presentoire() {

   const isConnected = useUserStore((state) => state.isConnected)
 const [documentUserName, setDocumentUserName] = useState("")
 const updateUserToken = useUserStore(state => state.updateUserToken)


    const [documentCollection, setDocumentCollection] = useState([])

    const [file, setFile] = useState([])

    const [isLoaded, setIsLoaded] = useState(true)

    
    useEffect(() => {
        
        async function fetchdata() {
            await axios.get(`${import.meta.env.VITE_APIURL}documents/presentoire/doc`
            )
            .then((response) => {
                setDocumentCollection(response.data)
                setIsLoaded(false);
            })
        }
        fetchdata()
        
    }, [])


    const maximizeDoc = (e) => {
      
        const divId = e.currentTarget.id
        console.log(divId);
        const divEl = document.getElementById(divId);
        console.log(divEl);
        if (divEl.className === "documentContainer laptop:laptopDocumentContainer tablet:tabletDocumentContainer") {
            divEl.classList.remove("documentContainer","laptop:laptopDocumentContainer","tablet:tabletDocumentContainer")
            divEl.classList.add("singleDoc","laptop:laptopSingleDoc","tablet:tabletSingleDoc")
           

        } else if (divEl.className === "singleDoc laptop:laptopSingleDoc tablet:tabletSingleDoc") {
            divEl.classList.remove("singleDoc","laptop:laptopSingleDoc","tablet:tabletSingleDoc")
            divEl.classList.add("documentContainer","laptop:laptopDocumentContainer","tablet:tabletDocumentContainer")
        }

    }
        
        
        
        
        
        const handleSubmitForm = (e) => {
            e.preventDefault()
            setDocumentUserName("")
            setFile([])
        
            const categoryChoice = document.getElementById("weekChoice")
            console.log(categoryChoice.selectedIndex + 4);
               if(file.length !== 0){
        
            const formdata = new FormData()
            formdata.append("file", file)
            formdata.append("document_name", categoryChoice.value)
            formdata.append("document", file.name)
            formdata.append("category_id",Number(categoryChoice.selectedIndex +4))

        axios.post(`${import.meta.env.VITE_APIURL}documents`, formdata, {
            headers: {Authorization: `Bearer ${updateUserToken}` ,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setDocumentCollection(prev => {
                return [...prev,response.data]
               
            })
        })
        categoryChoice.selectedIndex = 1;

    setDocumentUserName("")
           }else{
           alert('Pas de fichier selectionné')
           }
    }

    const handleDeleteDoc=(e) => {
        
        const docId = e.currentTarget.id
    
        
        axios.delete(`${import.meta.env.VITE_APIURL}documents/${docId}`,{
            headers: {Authorization: `Bearer ${updateUserToken}` ,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            const newArray = documentCollection.filter((document) => document.id != docId)
            setDocumentCollection(newArray)
   
  })
  .catch(error => {
    console.error(error);
  });
}

    return(
        <div>
            <div className='titlePageDiv'>
        <h1 className='pageTitle laptop:laptoppageTitle landscape:text-2xl'> Présentoire</h1>        
        </div>
        <div className="containPage laptop:laptopcontainPage">

        <div id='wrap' className="documentsContainer laptop:laptopDocumentsContainer gap-2">
                    {documentCollection && documentCollection.map(document =>

                        <div className="documentContainer laptop:laptopDocumentContainer tablet:tabletDocumentContainer" id={'file'+ document.id } key={document.id} onClick={maximizeDoc}>
                            <p className='titleDocContainer'>{document.document_name}</p>
                            <img className='imgItem' src={document.document} alt="" />
                            {isConnected &&
                           <button id={document.id} onClick={handleDeleteDoc}><span className="material-symbols-outlined">delete</span></button> 
                             }
                            
                            </div>
                    )
                    }
       </div>
       
        {isConnected &&
        
        <form className='formContainer laptop:laptopFormContainer items-center tablet:m-2' onSubmit={handleSubmitForm} >
                            <input className='fileInput laptop:w-[95%]' type="file" name="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            <select className='laptop:w-[95%]'  name="" id="weekChoice">
                                <option selected="selected" value="">Choix de la semaine</option>
                                <option id='5' value="Mardi St-Ambroix">Mardi St-Ambroix</option>
                                <option id='6' value="Jeudi Bessèges">Jeudi Bessèges</option>
                                <option id='7' value="Vendredi Barjac">Vendredi Barjac</option>
                                <option id='8' value="Samedi St-Ambroix">Samedi St-Ambroix</option>
                                </select>


                            <button className='btnForm laptop:w-[95%]'type='submit'>Ajouter le document</button>
                        </form>   }
        </div>
        </div>
    
    
    )
    
}