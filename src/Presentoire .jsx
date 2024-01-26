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
            await axios.get(`http://localhost:3000/api/documents/presentoire/doc`
            )
            .then((response) => {
                setDocumentCollection(response.data)
                setIsLoaded(false);
            })
        }
        fetchdata()
        
    }, [])


   const maximizeDoc = (e) => {
    console.log('ça clique');
            const divId = e.currentTarget.id
            const divEl = document.getElementById(divId) ; 
            console.log(divEl);
            if(divEl.className === 'documentContainer'){
                divEl.classList.remove("documentContainer")
                divEl.classList.add("singleDoc")
            }else if(divEl.className === "singleDoc"){
                divEl.classList.remove("singleDoc")
                divEl.classList.add("documentContainer")
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

        axios.post('http://localhost:3000/api/documents', formdata, {
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
    
        
        axios.delete(`http://localhost:3000/api/documents/${docId}`,{
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
        <h1 className='pageTitle'> Présentoire</h1>        
        </div>

        <div id='wrap' className='documentsContainer'>
                    {documentCollection && documentCollection.map(document =>

                        <div className="documentContainer" id={'file'+ document.id } key={document.id} onClick={maximizeDoc}>
                            <p className='titleDocContainer'>{document.document_name}</p>
                            <img className='imgItem' src={document.document} alt="" />
                            {isConnected &&
                           <button id={document.id} onClick={handleDeleteDoc}><span className="material-symbols-outlined">delete</span></button> 
                             }
                            
                            </div>
                          


                    )
                    }
       
        {isConnected &&
        
        <form className='formContainer' onSubmit={handleSubmitForm} >
                            <input className='fileInput' type="file" name="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            <select  name="" id="weekChoice">
                                <option selected="selected" value="">Choix de la semaine</option>
                                <option id='5' value="Mardi St-Ambroix">Mardi St-Ambroix</option>
                                <option id='6' value="Jeudi Bessèges">Jeudi Bessèges</option>
                                <option id='7' value="Vendredi Barjac">Vendredi Barjac</option>
                                <option id='8' value="Samedi St-Ambroix">Samedi St-Ambroix</option>
                                </select>


                            <button className='btnForm'type='submit'>envoie</button>
                        </form>   }
        </div>
        </div>
    
    
    )
    
}