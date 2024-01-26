import axios from 'axios'
import { useState, useEffect } from 'react';
import useUserStore from './userStore.js';

export default function FormDoc({value,setDocumentCollection}){

    console.log();
    const [documentUserName, setDocumentUserName] = useState("")
    const [file, setFile] = useState([])

    const [isLoaded, setIsLoaded] = useState(true)


 const isConnected = useUserStore((state) => state.isConnected)
 const updateUserToken = useUserStore(state => state.updateUserToken)

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
        formdata.append("category_id", value.value)
        


        axios.post('http://localhost:3000/api/documents', formdata, {
            headers: {Authorization: `Bearer ${updateUserToken}` ,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            value.setDocumentCollection(prev => {
                return [...prev,response.data]
                
            })
        })
    setDocumentUserName("")
           }else{
           alert('Pas de fichier selectionné')
           }

    }

    return(

        <form className='formContainer ' onSubmit={handleSubmitForm}>
                <input className='fileInput ' type="file" name="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                <input className='textInput '  placeholder='Nom du fichier' type="text" name="document_name"  value={documentUserName} onChange={(e) => { setDocumentUserName(e.target.value) }} />
                <button className='btnForm 'type='submit'>envoie</button>
            </form>
                          
    )

}