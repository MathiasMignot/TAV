import axios from 'axios'
import { useState, useEffect } from 'react';
import  useUserStore  from './userStore.js';
  


export default function DocsContainer({value}){


    const [documentUserName, setDocumentUserName] = useState("")

    const [documentCollection, setDocumentCollection] = useState([])

    const [file, setFile] = useState([])

    const [isLoaded, setIsLoaded] = useState(true)
    const [toggleStyleDoc, setToggleStyleDoc] = useState(false)


 const isConnected = useUserStore((state) => state.isConnected)
 const updateUserToken = useUserStore(state => state.updateUserToken)

   
    useEffect(() => {

        async function fetchdata() {
            await axios.get(`http://localhost:3000/api/documents/category/${value}`
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
        console.log('hello');
        console.log(documentUserName);
        setDocumentUserName("")
        setFile([])
        console.log(file);
           if(file.length !== 0){

        const formdata = new FormData()
        formdata.append("file", file)
        formdata.append("document_name", documentUserName)
        formdata.append("document", file.name)
        formdata.append("category_id", value)
        


        axios.post('http://localhost:3000/api/documents', formdata, {
            headers: {Authorization: `Bearer ${updateUserToken}` ,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setDocumentCollection(prev => {
                return [...prev,response.data]
                
            })
        })
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
            setToggleStyleDoc(false)
   
  })
  .catch(error => {
    console.error(error);
  });


        

    }



    if (!isLoaded) {

            return (


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
                        <form className='formContainer' onSubmit={handleSubmitForm}>
                            <input className='fileInput' type="file" name="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                            <input className='textInput'  placeholder='Nom du fichier' type="text" name="document_name"  value={documentUserName} onChange={(e) => { setDocumentUserName(e.target.value) }} />
                            <button className='btnForm'type='submit'>envoie</button>
                        </form>
                                      }

                
                </div>

            )
        }






    }
